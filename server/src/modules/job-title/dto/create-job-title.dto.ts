import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJobTitleDto {
    @IsString()
    @IsNotEmpty()
        name: string;
    @IsString()
        description: string;
}