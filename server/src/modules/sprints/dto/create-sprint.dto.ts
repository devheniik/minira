import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSprintDto {
    @IsString()
    @IsNotEmpty()
        name: string;

    @IsString()
    @IsNotEmpty()
        startDate: string;

    @IsString()
    @IsNotEmpty()
        endDate: string;

    @IsString()
        description: string;
}
