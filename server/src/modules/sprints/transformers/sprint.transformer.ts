import { Expose } from 'class-transformer';

export class SprintTransformer {
    @Expose()
        id: number;

    @Expose()
        name: string;

    @Expose()
        startDate: string;

    @Expose()
        endDate: string;

    @Expose()
        description: string;
}
