import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { PrismaService } from '../prisma/prisma.service';
import { omit } from 'lodash';

@Injectable()
export class IssueService {
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

    remove(id: number) {
        return this.prisma.issue.delete({ where: { id } });
    }
}
