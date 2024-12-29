import { SprintTransformer } from './transformers/sprint.transformer';
import { DtoType } from '../../utils/dto.type';
import { CreateSprintDto as CreateSprintDtoOriginal } from './dto/create-sprint.dto';
import { UpdateSprintDto as UpdateSprintDtoOriginal } from './dto/update-sprint.dto';
import { SprintViewTransformer } from './transformers/sprint-view.transformer';

export type SprintDto = DtoType<SprintTransformer>;
export type SprintViewDto = DtoType<SprintViewTransformer>;
export type CreateSprintDto = DtoType<CreateSprintDtoOriginal>;
export type UpdateSprintDto = DtoType<UpdateSprintDtoOriginal>;
