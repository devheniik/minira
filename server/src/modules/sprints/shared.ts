import { SprintTransformer } from './transformers/sprint.transformer';
import { DtoType } from '../../utils/dto.type';
import { CreateSprintDto as CreateSprintDtoOriginal } from './dto/create-sprint.dto';
import { UpdateSprintDto as UpdateSprintDtoOriginal } from './dto/update-sprint.dto';

export type SprintDto = DtoType<SprintTransformer>;
export type CreateSprintDto = DtoType<CreateSprintDtoOriginal>;
export type UpdateSprintDto = DtoType<UpdateSprintDtoOriginal>;
