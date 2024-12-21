import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateJobTitleDto {
    @IsString()
    @IsNotEmpty()
        name: string;
    @IsString()
        description: string;
}
