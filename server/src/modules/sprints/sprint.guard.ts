import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { checkResourceAccess } from 'src/common/guards/resource-access.guard';
import { SprintsService } from './sprints.service';

@Injectable()
export class SprintGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private sprintService: SprintsService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        return await checkResourceAccess(context, this.sprintService);
    }
}