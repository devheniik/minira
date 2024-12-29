import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LogsService {
    constructor(private prisma: PrismaService) {}

    async create(createLogDto: CreateLogDto) {
        const { issueId, remainingTime } = createLogDto;

        await this.prisma.timeLog.deleteMany({
            where: {
                logDate: {
                    gte: new Date(createLogDto.logDate),
                },
                issueId: createLogDto.issueId,
            },
        });

        await this.prisma.timeLog.create({
            data: {
                issueId: createLogDto.issueId,
                spentTime: createLogDto.spentTime,
                logDate: new Date(createLogDto.logDate),
            },
        });

        const logs = await this.prisma.timeLog.findMany({
            where: {
                issueId,
            },
        });

        const spentTime = logs.reduce((acc, log) => acc + log.spentTime, 0);

        const status = remainingTime > 0 ? 'in_progress' : 'done';

        return this.prisma.issue.update({
            where: {
                id: issueId,
            },
            data: {
                remainingTime,
                spentTime,
                originalEstimate: spentTime + remainingTime,
                status,
            },
        });
    }
}
