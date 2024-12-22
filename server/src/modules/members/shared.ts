import { MemberTransformer } from './transformers/member.transformer';
import { DtoType } from '../../utils/dto.type';
import { CreateMemberDto as CreateMemberDtoOriginal } from './dto/create-member.dto';
import { UpdateMemberDto as UpdateMemberDtoOriginal } from './dto/update-member.dto';

export type MemberDto = DtoType<MemberTransformer>;
export type CreateMemberDto = DtoType<CreateMemberDtoOriginal>;
export type UpdateMemberDto = DtoType<UpdateMemberDtoOriginal>;