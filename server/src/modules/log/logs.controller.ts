import { Body, Controller, ForbiddenException, Post, UseGuards } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from '../users/entities/user.entity';
import { User } from '../auth/user.decorator';

@Controller('log')
export class LogsController {
    constructor(private readonly logsService: LogsService, private readonly prismaService: PrismaService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createLogDto: CreateLogDto, @User() user: UserEntity) {

        const issue = await this.prismaService.issue.findUnique({
            where: { id: createLogDto.issueId },
            select: { companyId: true }
        });

        if (!issue || issue.companyId !== user.companyId) {
            throw new ForbiddenException('You can only log time on issues from your company');
        }

        return this.logsService.create(createLogDto);
    }
}
