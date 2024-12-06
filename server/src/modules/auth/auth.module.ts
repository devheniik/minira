import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {PrismaModule} from '../prisma/prisma.module';
import {UsersModule} from 'src/modules/users/users.module';
import {JwtStrategy} from './jwt.strategy';
import {jwtConfig} from "../../config/jwt.config";

export const jwtSecret = 'zjP9h6ZI5LoSKCRj';

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register(jwtConfig()),
        UsersModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
