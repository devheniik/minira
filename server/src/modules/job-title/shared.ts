import { JobTitleTransformer } from './transformers/job-title.transformer';
import { DtoType } from '../../utils/dto.type';
import { CreateJobTitleDto as CreateMemberDtoOriginal } from './dto/create-job-title.dto';
import { UpdateJobTitleDto as UpdateMemberDtoOriginal } from './dto/update-job-title.dto';

export type JobTitleDto = DtoType<JobTitleTransformer>;
export type CreateJobTitleDto = DtoType<CreateMemberDtoOriginal>;
export type UpdateJobTitleDto = DtoType<UpdateMemberDtoOriginal>;