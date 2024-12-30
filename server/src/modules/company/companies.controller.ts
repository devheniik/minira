import { Controller, Get, Patch, Body, Query, UseGuards, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompaniesService } from './companies.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { User } from '../auth/user.decorator';
import { UserEntity } from '../users/entities/user.entity';

@Controller('profile')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findByUser(@User() user: UserEntity) {
        const company = await this.companiesService.findOne(user.companyId);
        
        if (!company) {
            throw new NotFoundException(`Company with ID ${user.companyId} not found`);
        }
        return company;
    }

    @Patch()
    @UseGuards(JwtAuthGuard)
    async update(
        @Body() updateCompanyDto: UpdateCompanyDto,
        @User() user: UserEntity,
    ) {
        console.log('User from token:', user);

        const updatedCompany = await this.companiesService.update(user.companyId, updateCompanyDto);
        
        if (!updatedCompany) {
            throw new NotFoundException(`Company with ID ${user.companyId} not found`);
        }

        return updatedCompany;
    }
}
