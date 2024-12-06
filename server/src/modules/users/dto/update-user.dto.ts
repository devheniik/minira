import {PartialType} from '@nestjs/swagger';
import {UserBase} from "./register.dto";

export class UpdateUserDto extends PartialType(UserBase) {}
