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
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { User } from '../auth/user.decorator';
import { User as UserEntity } from '.prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MemberTransformer } from './transformers/member.transformer';
import { plainToInstance } from 'class-transformer';
import { MemberGuard } from './member.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('member')
export class MembersController {
    constructor(private readonly membersService: MembersService, private readonly prismaService: PrismaService) {}

    /**
     * Validates that a job title belongs to the user's company
     * @throws ForbiddenException if the job title doesn't exist or belongs to another company
     */
    private async validateJobTitleCompany(jobTitleId: number, userCompanyId: number): Promise<void> {
        const jobTitle = await this.prismaService.jobTitle.findUnique({
            where: { id: jobTitleId },
            select: { companyId: true }
        });

        if (!jobTitle || jobTitle.companyId !== userCompanyId) {
            throw new ForbiddenException('You can only assign job titles from your company');
        }
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createMemberDto: CreateMemberDto, @User() user: UserEntity) {
        
        await this.validateJobTitleCompany(createMemberDto.jobTitleId, user.companyId);

        return this.membersService.create({
            ...createMemberDto,
            companyId: user.companyId,
        });
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@User() user: UserEntity) {
        const members = this.membersService.findByCompany(user.companyId);

        return plainToInstance(MemberTransformer, members, {
            excludeExtraneousValues: true,
        });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, MemberGuard)
    findOne(@Param('id') id: string) {
        return this.membersService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, MemberGuard)
    async update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto, @User() user: UserEntity) {

        await this.validateJobTitleCompany(updateMemberDto.jobTitleId, user.companyId);

        return this.membersService.update(+id, updateMemberDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, MemberGuard)
    remove(@Param('id') id: string) {
        return this.membersService.remove(+id);
    }
}
