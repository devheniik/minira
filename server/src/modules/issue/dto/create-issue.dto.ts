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

    @IsIn(['story', 'bug', 'task', 'epic'])
        type: string;

    @IsNumber()
    @IsNotEmpty()
        memberId: unknown;

    @IsNumber()
    @IsOptional()
        parentIssueId: unknown;

    @IsNumber()
    @IsOptional()
        sprintId: number;
}
