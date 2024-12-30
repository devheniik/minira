import {IsDateString, IsNotEmpty, IsString} from 'class-validator';

export class CreateSprintDto {
    @IsString()
    @IsNotEmpty()
        name: string;

    @IsDateString()
    @IsNotEmpty()
        startDate: string;

    @IsDateString()
    @IsNotEmpty()
        endDate: string;

    @IsString()
        description: string;
}
