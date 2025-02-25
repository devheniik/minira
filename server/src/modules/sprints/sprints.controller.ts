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
import { IssuesToSprintDto } from './dto/issues-to-sprint.dto';
import { DuplicateSprintDto } from './dto/duplicate-sprint.dto';

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

    @Post('duplicate/:id')
    @UseGuards(JwtAuthGuard)
    duplicate(
        @Param('id') id: string,
        @Body() duplicateSprintDto: DuplicateSprintDto,
        @User() user: UserEntity,
    ) {
        return this.sprintsService.duplicate(+id, {
            ...duplicateSprintDto,
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

        const sprintView = plainToInstance(SprintViewTransformer, sprint, {
            excludeExtraneousValues: false,
        });

        sprintView.issues.sort((a, b) => a.member.localeCompare(b.member));

        return sprintView;
    }

    @Get(':id/issue/:issueId')
    @UseGuards(JwtAuthGuard)
    async findOneForIssue(
        @Param('id') id: string,
        @Param('issueId') issueId: string,
    ) {
        const sprint = await this.sprintsService.findOne(+id, [+issueId]);

        return plainToInstance(SprintViewTransformer, sprint, {
            excludeExtraneousValues: false,
        });
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateSprintDto: UpdateSprintDto) {
        return this.sprintsService.update(+id, updateSprintDto);
    }

    @Patch('attach-issues-to-sprint/:id')
    @UseGuards(JwtAuthGuard)
    attachIssues(
        @Param('id') id: string,
        @Body() issuesToSprintDto: IssuesToSprintDto,
    ) {
        return this.sprintsService.attachIssuesToSprint(+id, issuesToSprintDto);
    }

    @Patch('detach-issues-to-sprint/:id')
    @UseGuards(JwtAuthGuard)
    detachIssues(
        @Param('id') id: string,
        @Body() issuesToSprintDto: IssuesToSprintDto,
    ) {
        return this.sprintsService.detachIssuesFromSprint(
            +id,
            issuesToSprintDto,
        );
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.sprintsService.remove(+id);
    }
}
