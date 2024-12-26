import {
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateIssueDto {
    @IsString()
    @IsNotEmpty()
        name: string;

    @IsString()
        description: string;

    @IsNumber()
    @IsNotEmpty()
        originalEstimate: number;

    @IsNumber()
    @IsNotEmpty()
        remainingTime: number;

    @IsNumber()
    @IsNotEmpty()
        spentTime: number;

    @IsString()
    @IsNotEmpty()
        status: string;

    @IsIn(['story', 'bug', 'task', 'epic'])
        type: string;

    @IsNumber()
    @IsNotEmpty()
        memberId: never;

    @IsNumber()
    @IsOptional()
        parentIssueId: number;

    @IsNumber()
    @IsOptional()
        sprintId: number;
}
