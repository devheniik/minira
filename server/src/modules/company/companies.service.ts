import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {UpdateCompanyDto} from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
    constructor(private prisma: PrismaService) {}

    findOne(id: number) {
        return this.prisma.company.findUnique({
            where: { id }
        });
    }

    update(id: number, updateArticleDto: UpdateCompanyDto) {
        return this.prisma.company.update({
            where: { id },
            data: updateArticleDto,
        });
    }

    remove(id: number) {
        return this.prisma.company.delete({ where: { id } });
    }
}
