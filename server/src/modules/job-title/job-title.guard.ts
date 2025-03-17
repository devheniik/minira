import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JobTitleService } from "./job-title.service";
import { checkResourceAccess } from "src/common/guards/resource-access.guard";


@Injectable()
export class JobTitleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jobTitleService: JobTitleService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {  
        return await checkResourceAccess(context, this.jobTitleService)
    }
}