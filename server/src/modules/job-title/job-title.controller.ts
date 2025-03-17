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
import { JobTitleService } from './job-title.service';
import { CreateJobTitleDto } from './dto/create-job-title.dto';
import { UpdateJobTitleDto } from './dto/update-job-title.dto';
import { User } from '../auth/user.decorator';
import { User as UserEntity } from '.prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { plainToInstance } from 'class-transformer';
import { JobTitleTransformer } from './transformers/job-title.transformer';
import { JobTitleGuard } from './job-title.guard';

@Controller('job-title')
export class JobTitleController {
    constructor(private readonly jobTitleService: JobTitleService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(
        @Body() createJobTitleDto: CreateJobTitleDto,
        @User() user: UserEntity,
    ) {
        return this.jobTitleService.create({
            ...createJobTitleDto,
            companyId: user.companyId,
        });
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@User() user: UserEntity) {
        const titles = this.jobTitleService.findByCompany(user.companyId);

        return plainToInstance(JobTitleTransformer, titles, {
            excludeExtraneousValues: true,
        });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, JobTitleGuard)
    findOne(@Param('id') id: string) {
        return this.jobTitleService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, JobTitleGuard)    
    update(
        @Param('id') id: string,
        @Body() updateJobTitleDto: UpdateJobTitleDto,
    ) {
        return this.jobTitleService.update(+id, updateJobTitleDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, JobTitleGuard)
    remove(@Param('id') id: string) {
        return this.jobTitleService.remove(+id);
    }
}
