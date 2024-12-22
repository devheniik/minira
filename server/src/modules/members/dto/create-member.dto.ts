import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMemberDto {
    @IsString()
    @IsNotEmpty()
        fullName: string;
    @IsNumber()
    @IsNotEmpty()
        jobTitleId: number;
}
