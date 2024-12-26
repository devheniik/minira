import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Issue } from '@prisma/client';
import { omit } from 'lodash';

@Injectable()
export class IssueService {
    constructor(private prisma: PrismaService) {}

    async create(createIssueDto: CreateIssueDto & { companyId: number }) {
        const issue = await this.prisma.issue.create({
            data: omit(createIssueDto, ['sprintId']),
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

    findByCompany(id: number): Promise<Issue[]> {
        return this.prisma.issue.findMany({
            where: {
                companyId: id,
            },
        });
    }

    findBySprint(id: number): Promise<Issue[]> {
        return this.prisma.issue.findMany({
            where: {
                sprints: {
                    some: {
                        sprintId: id,
                    },
                },
            },
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
