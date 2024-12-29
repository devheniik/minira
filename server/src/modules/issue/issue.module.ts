import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MembersService } from '../members/members.service';

@Module({
    controllers: [IssueController],
    providers: [IssueService, MembersService, PrismaService],
})
export class IssueModule {}
