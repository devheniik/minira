import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
    constructor(private prisma: PrismaService) {}

    async findOne(id: number) {
        if (!id) {
            throw new NotFoundException('Company ID is required');
        }

        const company = await this.prisma.company.findUnique({
            where: {
                id,
            }
        });

        if (!company) {
            throw new NotFoundException(`Company with id ${id} not found`);
        }

        return company;
    }
    
    async update(id: number, updateCompanyDto: UpdateCompanyDto) {
        if (!id) {
            throw new NotFoundException('Company ID is required');
        }

        const updatedCompany = await this.prisma.company.update({
            where: { id },
            data: updateCompanyDto,
        });

        if (!updatedCompany) {
            throw new NotFoundException(`Company with id ${id} not found`);
        }

        return updatedCompany;
    }
}