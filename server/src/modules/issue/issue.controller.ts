import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { User as UserEntity } from '@prisma/client';
import { MembersService } from '../members/members.service';
import { IssueTransformer } from './transformers/issue.transformer';
import { plainToInstance } from 'class-transformer';
import { IssueGuard } from './issue.guard';

@Controller('issue')
export class IssueController {
    constructor(
        private readonly issueService: IssueService,
        private readonly membersService: MembersService,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(
        @Body() createIssueDto: CreateIssueDto,
        @User() user: UserEntity,
    ) {
        const member = await this.membersService.findOne(
            createIssueDto.memberId,
        );

        if (member.companyId !== user.companyId) {
            throw new Error('Forbidden');
        }

        return this.issueService.create({
            ...createIssueDto,
            companyId: user.companyId,
            memberId: createIssueDto.memberId,
        });
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findByCompany(
        @User() user: UserEntity,
        @Query('name') name: string,
        @Query('type') type: string,
    ) {
        const issues = await this.issueService.filterByCompany(
            user.companyId,
            name,
            type,
        );

        return plainToInstance(IssueTransformer, issues, {
            excludeExtraneousValues: true,
        });
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, IssueGuard)
    update(@Param('id') id: string, @Body() updateIssueDto: UpdateIssueDto) {
        return this.issueService.update(+id, updateIssueDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, IssueGuard)
    remove(@Param('id') id: string) {
        return this.issueService.remove(+id);
    }
}
