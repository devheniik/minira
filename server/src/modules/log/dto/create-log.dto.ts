import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLogDto {
    @IsNumber()
    @IsNotEmpty()
        issueId: number;

    @IsNumber()
    @IsNotEmpty()
        spentTime: number;

    @IsNumber()
    @IsNotEmpty()
        remainingTime: number;

    @IsDateString()
    @IsNotEmpty()
        logDate: string;
}
