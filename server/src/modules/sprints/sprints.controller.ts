import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
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
import { SprintGuard } from './sprint.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('sprint')
export class SprintsController {
    constructor(
        private readonly sprintsService: SprintsService,
        private readonly prismaService: PrismaService,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createSprintDto: CreateSprintDto, @User() user: UserEntity) {
        return this.sprintsService.create({
            ...createSprintDto,
            companyId: user.companyId,
        });
    }

    @Post('duplicate/:id')
    @UseGuards(JwtAuthGuard, SprintGuard)
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
    @UseGuards(JwtAuthGuard, SprintGuard)
    async findOne(@Param('id') id: string) {
        const sprint = await this.sprintsService.findOne(+id);

        const sprintView = plainToInstance(SprintViewTransformer, sprint, {
            excludeExtraneousValues: false,
        });

        sprintView.issues.sort((a, b) => a.member.localeCompare(b.member));

        return sprintView;
    }

    @Get(':id/issue/:issueId')
    @UseGuards(JwtAuthGuard, SprintGuard)
    async findOneForIssue(
        @Param('id') id: string,
        @Param('issueId') issueId: string,
        @User() user: UserEntity,
    ) {
        // Validate that the issue belongs to the user's company
        const issue = await this.prismaService.issue.findUnique({
            where: { id: +issueId },
            select: { companyId: true },
        });

        if (!issue || issue.companyId !== user.companyId) {
            throw new ForbiddenException(
                'You can only access issues from your company',
            );
        }

        const sprint = await this.sprintsService.findOne(+id, [+issueId]);

        return plainToInstance(SprintViewTransformer, sprint, {
            excludeExtraneousValues: false,
        });
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, SprintGuard)
    update(@Param('id') id: string, @Body() updateSprintDto: UpdateSprintDto) {
        return this.sprintsService.update(+id, updateSprintDto);
    }

    @Patch('attach-issues-to-sprint/:id')
    @UseGuards(JwtAuthGuard, SprintGuard)
    async attachIssues(
        @Param('id') id: string,
        @Body() issuesToSprintDto: IssuesToSprintDto,
        @User() user: UserEntity,
    ) {
        // Validate that all issues belong to the user's company
        await this.validateIssuesCompany(
            issuesToSprintDto.issueIds,
            user.companyId,
        );

        return this.sprintsService.attachIssuesToSprint(+id, issuesToSprintDto);
    }

    @Patch('detach-issues-to-sprint/:id')
    @UseGuards(JwtAuthGuard, SprintGuard)
    async detachIssues(
        @Param('id') id: string,
        @Body() issuesToSprintDto: IssuesToSprintDto,
        @User() user: UserEntity,
    ) {
        // Validate that all issues belong to the user's company
        await this.validateIssuesCompany(
            issuesToSprintDto.issueIds,
            user.companyId,
        );

        return this.sprintsService.detachIssuesFromSprint(
            +id,
            issuesToSprintDto,
        );
    }

    /**
     * Validates that all issues belong to the user's company
     * @throws ForbiddenException if any issue doesn't exist or belongs to another company
     */
    private async validateIssuesCompany(
        issueIds: number[],
        userCompanyId: number,
    ): Promise<void> {
        // Get all issues at once for better performance
        const issues = await this.prismaService.issue.findMany({
            where: { id: { in: issueIds } },
            select: { id: true, companyId: true },
        });

        // Check if we found all requested issues
        if (issues.length !== issueIds.length) {
            throw new ForbiddenException('One or more issues not found');
        }

        // Check if all issues belong to the user's company
        const invalidIssue = issues.find(
            (issue) => issue.companyId !== userCompanyId,
        );
        if (invalidIssue) {
            throw new ForbiddenException(
                'You can only attach issues from your company',
            );
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, SprintGuard)
    remove(@Param('id') id: string) {
        return this.sprintsService.remove(+id);
    }
}