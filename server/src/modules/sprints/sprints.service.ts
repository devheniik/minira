import { Injectable } from '@nestjs/common';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IssuesToSprintDto } from './dto/issues-to-sprint.dto';
import { DuplicateSprintDto } from './dto/duplicate-sprint.dto';

@Injectable()
export class SprintsService {
    constructor(private prisma: PrismaService) {}

    create(createSprintDto: CreateSprintDto & { companyId: number }) {
        return this.prisma.sprint.create({
            data: createSprintDto,
        });
    }

    async duplicate(
        id: number,
        createSprintDto: DuplicateSprintDto & { companyId: number },
    ) {
        const sprint = await this.prisma.sprint.create({
            data: createSprintDto,
            include: {
                issues: true,
            },
        });

        const duplicateSprint = await this.prisma.sprint.findUnique({
            where: { id },
            include: {
                issues: true,
            },
        });

        await this.prisma.sprintTask.createMany({
            data: duplicateSprint.issues.map((issue) => ({
                sprintId: sprint.id,
                issueId: issue.issueId,
            })),
        });

        return sprint;
    }

    findByCompany(id: number) {
        return this.prisma.sprint.findMany({
            where: {
                companyId: id,
            },
        });
    }

    findOne(id: number, issueIds: number[] = []) {
        return this.prisma.sprint.findUnique({
            where: { id },
            include: {
                issues: {
                    where: issueIds?.length
                        ? {
                            issueId: { in: issueIds },
                        }
                        : undefined,
                    include: {
                        issue: {
                            include: {
                                member: true,
                                timeLogs: true,
                            },
                        },
                    },
                },
            },
        });
    }

    update(id: number, updateSprintDto: UpdateSprintDto) {
        return this.prisma.sprint.update({
            where: { id },
            data: updateSprintDto,
        });
    }

    attachIssuesToSprint(id: number, issuesToSprintDto: IssuesToSprintDto) {
        const { issueIds } = issuesToSprintDto;

        const sprintTasks = issueIds.map((issueId) => ({
            sprintId: id,
            issueId,
        }));

        return this.prisma.sprintTask.createMany({
            data: sprintTasks,
            skipDuplicates: true,
        });
    }

    async detachIssuesFromSprint(
        id: number,
        issuesToSprintDto: IssuesToSprintDto,
    ) {
        const { issueIds } = issuesToSprintDto;

        const associatedIssues = await this.prisma.sprintTask.findMany({
            where: {
                sprintId: id,
                issueId: { in: issueIds },
            },
            select: { issueId: true },
        });

        if (associatedIssues.length === 0) {
            throw new Error(
                'No matching issues are associated with this sprint',
            );
        }

        return this.prisma.sprintTask.deleteMany({
            where: {
                sprintId: id,
                issueId: { in: issueIds },
            },
        });
    }

    async remove(id: number) {
        await this.prisma.sprintTask.deleteMany({
            where: {
                sprintId: id,
            },
        });

        return this.prisma.sprint.delete({ where: { id } });
    }
}
