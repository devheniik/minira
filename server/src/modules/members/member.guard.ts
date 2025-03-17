import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { checkResourceAccess } from "src/common/guards/resource-access.guard";
import { MembersService } from "./members.service";


@Injectable()
export class MemberGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private memberService: MembersService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {  
        return await checkResourceAccess(context, this.memberService)
    }
}