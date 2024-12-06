import {IsEmail, IsNotEmpty, IsNumber, IsString, MinLength} from 'class-validator';
import {omit} from 'lodash';

export class UserBase {
    @IsString()
    @IsNotEmpty()
        fullName: string;

    @IsEmail()
    @IsNotEmpty()
        email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
        password: string;
}

export class RegisterDto extends UserBase {
    @IsString()
    @IsNotEmpty()
        companyName: string;
}


export class CreateUserDto extends UserBase {
    constructor(user: RegisterDto, companyId: number) {
        super();
        Object.assign(this, {
            ...omit(user, ['companyName']),
            companyId,
        });
    }

    @IsNotEmpty()
    @IsNumber()
        companyId: number;
}