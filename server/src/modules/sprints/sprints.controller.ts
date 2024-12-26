import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { SprintsService } from './sprints.service';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { User as UserEntity } from '.prisma/client';
import { plainToInstance } from 'class-transformer';
import { SprintTransformer } from './transformers/sprint.transformer';
import { SprintViewTransformer } from './transformers/sprint-view.transformer';

@Controller('sprint')
export class SprintsController {
    constructor(private readonly sprintsService: SprintsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createSprintDto: CreateSprintDto, @User() user: UserEntity) {
        return this.sprintsService.create({
            ...createSprintDto,
            companyId: user.companyId,
        });
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@User() user: UserEntity) {
        const sprints = this.sprintsService.findByCompany(user.companyId);

        return plainToInstance(SprintTransformer, sprints, {
            excludeExtraneousValues: true,
        });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: string) {
        const sprint = await this.sprintsService.findOne(+id);

        console.log(sprint.issues);

        return plainToInstance(SprintViewTransformer, sprint, {
            excludeExtraneousValues: true,
        });
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateSprintDto: UpdateSprintDto) {
        return this.sprintsService.update(+id, updateSprintDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.sprintsService.remove(+id);
    }
}
