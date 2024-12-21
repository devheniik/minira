import { Injectable } from '@nestjs/common';
import { CreateJobTitleDto } from './dto/create-job-title.dto';
import { UpdateJobTitleDto } from './dto/update-job-title.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobTitleService {
    constructor(private prisma: PrismaService) {}

    create(createJobTitleDto: CreateJobTitleDto & { companyId: number }) {
        return this.prisma.jobTitle.create({
            data: createJobTitleDto,
        });
    }

    findByCompany(id: number) {
        return this.prisma.jobTitle.findMany({ where: { companyId: id } });
    }

    findOne(id: number) {
        return this.prisma.jobTitle.findUnique({ where: { id } });
    }

    update(id: number, updateJobTitleDto: UpdateJobTitleDto) {
        return this.prisma.jobTitle.update({
            where: { id },
            data: updateJobTitleDto,
        });
    }

    remove(id: number) {
        return this.prisma.jobTitle.delete({ where: { id } });
    }
}
