import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {PrismaModule} from '../prisma/prisma.module';
import {AuthService} from "../auth/auth.service";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "../auth/jwt.strategy";
import {jwtConfig} from "../../config/jwt.config";

@Module({
    controllers: [UsersController],
    providers: [UsersService, AuthService, JwtStrategy],
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register(jwtConfig())
    ],
    exports: [UsersService],
})
export class UsersModule {}
