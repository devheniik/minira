import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCompanyDto } from './dto/update-company.dto';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: PrismaService,
          useValue: {
            company: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should return a company by ID', async () => {
    const mockCompany = {
      id: 1,
      name: 'Test Company',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(prisma.company, 'findUnique').mockResolvedValue(mockCompany);

    const result = await service.findOne(1);

    expect(result).toEqual(mockCompany);
    expect(prisma.company.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should throw NotFoundException if company not found', async () => {
    jest.spyOn(prisma.company, 'findUnique').mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(
      new NotFoundException(`Company with id 1 not found`),
    );
    expect(prisma.company.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should throw NotFoundException if ID is not provided (findOne)', async () => {
    await expect(service.findOne(undefined)).rejects.toThrow(
      new NotFoundException('Company ID is required'),
    );
  });

  it('should update a company by ID', async () => {
    const mockUpdatedCompany = {
      id: 1,
      name: 'Updated Company Name',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(prisma.company, 'update').mockResolvedValue(mockUpdatedCompany);

    const updateDto: UpdateCompanyDto = { name: 'Updated Company Name' };
    const result = await service.update(1, updateDto);

    expect(result).toEqual(mockUpdatedCompany);
    expect(prisma.company.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateDto,
    });
  });

  it('should throw NotFoundException if company not found during update', async () => {
    jest.spyOn(prisma.company, 'update').mockRejectedValue(
      new NotFoundException(`Company with id 1 not found`),
    );

    const updateDto: UpdateCompanyDto = { name: 'Updated Company Name' };

    await expect(service.update(1, updateDto)).rejects.toThrow(
      new NotFoundException(`Company with id 1 not found`),
    );
    expect(prisma.company.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateDto,
    });
  });

  it('should throw NotFoundException if ID is not provided (update)', async () => {
    const updateDto: UpdateCompanyDto = { name: 'Updated Company Name' };

    await expect(service.update(undefined, updateDto)).rejects.toThrow(
      new NotFoundException('Company ID is required'),
    );
  });
});
