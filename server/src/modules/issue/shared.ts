import { IssueTransformer } from './transformers/issue.transformer';
import { IssueTableTransformer } from './transformers/issue-table.transformer';
import { DtoType } from '../../utils/dto.type';
import { CreateIssueDto as CreateIssueDtoOriginal } from './dto/create-issue.dto';
import { UpdateIssueDto as UpdateIssueDtoOriginal } from './dto/update-issue.dto';

export type IssueDto = DtoType<IssueTransformer>;
export type IssueTableDto = DtoType<IssueTableTransformer>;
export type CreateIssueDto = DtoType<CreateIssueDtoOriginal>;
export type UpdateIssueDto = DtoType<UpdateIssueDtoOriginal>;
