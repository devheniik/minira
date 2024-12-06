import {Injectable} from '@nestjs/common';
import {CreateUserDto, RegisterDto} from './dto/register.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {PrismaService} from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async register(registerDto: RegisterDto) {
        return this.prisma.$transaction(async (prisma) => {
            const company = await prisma.company.create({
                data: {
                    name: registerDto.companyName,
                },
            });

            const createUserDto = new CreateUserDto(registerDto, company.id);
            createUserDto.password = await bcrypt.hash(
                createUserDto.password,
                roundsOfHashing,
            );

            return prisma.user.create({
                data: createUserDto,
            });
        });
    }

    findAll() {
        return this.prisma.user.findMany();
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(
                updateUserDto.password,
                roundsOfHashing,
            );
        }

        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    remove(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}
