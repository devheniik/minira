import {Body, Controller, Param, ParseIntPipe, Patch,} from '@nestjs/common';
import {CompaniesService} from './companies.service';
import {UpdateCompanyDto} from './dto/update-company.dto';

@Controller('company')
export class CompaniesController {
    constructor(private readonly articlesService: CompaniesService) {}

  @Patch(':id')
    async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateCompanyDto,
    ) {
        await this.articlesService.update(id, updateArticleDto)
    }
}
