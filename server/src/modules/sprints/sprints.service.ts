import { Injectable } from '@nestjs/common';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SprintsService {
    constructor(private prisma: PrismaService) {}

    create(createSprintDto: CreateSprintDto & { companyId: number }) {
        return this.prisma.sprint.create({
            data: createSprintDto,
        });
    }

    findByCompany(id: number) {
        return this.prisma.sprint.findMany({
            where: {
                companyId: id,
            },
        });
    }

    findOne(id: number) {
        return this.prisma.sprint.findUnique({ where: { id } });
    }

    update(id: number, updateSprintDto: UpdateSprintDto) {
        return this.prisma.sprint.update({
            where: { id },
            data: updateSprintDto,
        });
    }

    remove(id: number) {
        return this.prisma.sprint.delete({ where: { id } });
    }
}
