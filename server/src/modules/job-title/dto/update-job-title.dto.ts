import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateJobTitleDto {
    @IsString()
    @IsNotEmpty()
        name: string;

    @IsOptional() 
    @IsString()
        description: string;
}
