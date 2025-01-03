import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateCompanyDto } from './dto/update-company.dto';

describe('CompaniesController (e2e)', () => {
  let app: INestApplication;
  let companiesService: Partial<CompaniesService>;

  const mockCompany = {
    id: 1,
    name: 'Test Company',
    address: '123 Main St',
  };

  const mockUser = {
    id: 1,
    companyId: 1,
  };

  beforeAll(async () => {
    companiesService = {
      findOne: jest.fn().mockResolvedValue(mockCompany),
      update: jest.fn().mockResolvedValue({ ...mockCompany, name: 'Updated Company' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        {
          provide: CompaniesService,
          useValue: companiesService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context) => {
          const req = context.switchToHttp().getRequest();
          req.user = mockUser;
          return true;
        },
      })
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /profile', () => {
    it('should return the company for the logged-in user', async () => {
      const response = await request(app.getHttpServer())
        .get('/profile')
        .set('Authorization', 'Bearer fake-token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCompany);
      expect(companiesService.findOne).toHaveBeenCalledWith(mockUser.companyId);
    });

    it('should return 404 if the company is not found', async () => {
      jest.spyOn(companiesService, 'findOne').mockResolvedValueOnce(null);

      const response = await request(app.getHttpServer())
        .get('/profile')
        .set('Authorization', 'Bearer fake-token');

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual(`Company with ID ${mockUser.companyId} not found`);
    });
  });

  describe('PATCH /profile', () => {
    it('should update the company information', async () => {
      const updateData: UpdateCompanyDto = { name: 'Updated Company' };

      const response = await request(app.getHttpServer())
        .patch('/profile')
        .set('Authorization', 'Bearer fake-token')
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.name).toEqual(updateData.name);
      expect(companiesService.update).toHaveBeenCalledWith(mockUser.companyId, updateData);
    });

    it('should return 404 if the company is not found during update', async () => {
      jest.spyOn(companiesService, 'update').mockResolvedValueOnce(null);

      const updateData: UpdateCompanyDto = { name: 'Nonexistent Company' };

      const response = await request(app.getHttpServer())
        .patch('/profile')
        .set('Authorization', 'Bearer fake-token')
        .send(updateData);

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual(`Company with ID ${mockUser.companyId} not found`);
    });
  });
});
