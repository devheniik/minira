import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { checkResourceAccess } from 'src/common/guards/resource-access.guard';
import { UsersService } from './users.service';

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private userService: UsersService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        return await checkResourceAccess(context, this.userService);
    }
}