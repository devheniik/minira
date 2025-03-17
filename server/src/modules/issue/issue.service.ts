import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { PrismaService } from '../prisma/prisma.service';
import { omit } from 'lodash';
import { ResourceAccessService } from 'src/common/interfaces/resource-access.interface';
import { Issue } from '@prisma/client';

@Injectable()
export class IssueService implements ResourceAccessService<Issue> {
    constructor(private prisma: PrismaService) {}

    async create(createIssueDto: CreateIssueDto & { companyId: number }) {
        const issue = await this.prisma.issue.create({
            data: {
                ...omit(createIssueDto, ['sprintId']),
                spentTime: 0,
                remainingTime: createIssueDto.originalEstimate,
                status: 'in_progress',
            },
        });

        if (!createIssueDto.sprintId) {
            return issue;
        }

        await this.prisma.sprintTask.create({
            data: {
                issueId: issue.id,
                sprintId: createIssueDto.sprintId,
            },
        });

        return issue;
    }

    findOne(id: number) {
        return this.prisma.issue.findUnique({
            where: { id: id },
        });
    }

    filterByCompany(companyId: number, name?: string, type?: string) {
        return this.prisma.issue.findMany({
            where: {
                companyId,
                ...(name && {
                    name: { contains: name.trim(), mode: 'insensitive' },
                }),
                ...(type && { type }),
            },
            take: 20,
        });
    }

    update(id: number, updateIssueDto: UpdateIssueDto) {
        return this.prisma.issue.update({
            where: { id },
            data: updateIssueDto,
        });
    }

    async remove(id: number) {
        return this.prisma.$transaction(async (prisma) => {
            await prisma.timeLog.deleteMany({
                where: { issueId: id },
            });

            await prisma.sprintTask.deleteMany({
                where: { issueId: id },
            });

            const subIssues = await prisma.issue.findMany({
                where: { parentIssueId: id },
                select: { id: true },
            });

            for (const subIssue of subIssues) {
                await this.remove(subIssue.id);
            }

            return prisma.issue.delete({
                where: { id },
            });
        });
    }
}
