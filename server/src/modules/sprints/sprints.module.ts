import { Module } from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { SprintsController } from './sprints.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [SprintsController],
    providers: [SprintsService, PrismaService],
})
export class SprintsModule {}
