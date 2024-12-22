import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MembersService {
    constructor(private prisma: PrismaService) {}

    create(createMemberDto: CreateMemberDto & { companyId: number }) {
        return this.prisma.member.create({
            data: createMemberDto,
        });
    }

    findByCompany(id: number) {
        return this.prisma.member.findMany({
            where: {
                companyId: id,
            },
            include: {
                jobTitle: true,
            },
        });
    }

    findOne(id: number) {
        return this.prisma.member.findUnique({ where: { id } });
    }

    update(id: number, updateMemberDto: UpdateMemberDto) {
        return this.prisma.member.update({
            where: { id },
            data: updateMemberDto,
        });
    }

    remove(id: number) {
        return this.prisma.member.delete({ where: { id } });
    }
}
