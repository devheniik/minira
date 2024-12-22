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
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { User } from '../auth/user.decorator';
import { User as UserEntity } from '.prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MemberTransformer } from './transformers/member.transformer';
import { plainToInstance } from 'class-transformer';

@Controller('member')
export class MembersController {
    constructor(private readonly membersService: MembersService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createMemberDto: CreateMemberDto, @User() user: UserEntity) {
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
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.membersService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
        return this.membersService.update(+id, updateMemberDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.membersService.remove(+id);
    }
}
