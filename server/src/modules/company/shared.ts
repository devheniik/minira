import { DtoType } from '../../utils/dto.type';
import { UpdateCompanyDto as UpdateCompanyDtoOriginal } from './dto/update-company.dto';
import { CompanyTransformer } from './transformers/company.transformer';

export type CompanyDto = DtoType<CompanyTransformer>;
export type UpdateCompanyDto = DtoType<UpdateCompanyDtoOriginal>;
