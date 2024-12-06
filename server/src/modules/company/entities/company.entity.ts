// src/company/entities/company.entity.ts

import {Company} from '@prisma/client';

export class CompanyEntity implements Company {
    id: number;

    name: string;

    createdAt: Date;

    updatedAt: Date;
}
