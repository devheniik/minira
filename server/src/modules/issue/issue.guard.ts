import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { checkResourceAccess } from "src/common/guards/resource-access.guard";
import { IssueService } from "./issue.service";


@Injectable()
export class IssueGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private issueService: IssueService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {  
        return await checkResourceAccess(context, this.issueService)
    }
}