import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMemberDto {
    @IsString()
    @IsNotEmpty()
        fullName: string;
    @IsNumber()
    @IsNotEmpty()
        jobTitleId: number;
}
