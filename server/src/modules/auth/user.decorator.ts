import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const User = createParamDecorator(<T>(data: T, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});