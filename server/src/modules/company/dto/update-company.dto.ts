import {IsNotEmpty, IsString} from 'class-validator';

export class UpdateCompanyDto {
    @IsString()
    @IsNotEmpty()
        fullName: string;
}
