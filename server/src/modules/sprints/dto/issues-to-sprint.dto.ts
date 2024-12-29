import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class IssuesToSprintDto {
    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
        issueIds: number[];
}
