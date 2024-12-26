import { IssueTransformer } from './transformers/issue.transformer';
import { DtoType } from '../../utils/dto.type';
import { CreateIssueDto as CreateIssueDtoOriginal } from './dto/create-issue.dto';
import { UpdateIssueDto as UpdateIssueDtoOriginal } from './dto/update-issue.dto';

export type IssueDto = DtoType<IssueTransformer>;
export type CreateIssueDto = DtoType<CreateIssueDtoOriginal>;
export type UpdateIssueDto = DtoType<UpdateIssueDtoOriginal>;
