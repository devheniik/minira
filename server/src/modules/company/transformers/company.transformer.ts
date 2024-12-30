import { Expose } from 'class-transformer';

export class CompanyTransformer {
    @Expose()
        id: number;

    @Expose()
        name: string;

    @Expose()
        createdAt: Date;

    @Expose()
        updatedAt: Date;
}

