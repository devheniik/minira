import { Expose } from 'class-transformer';

export class JobTitleTransformer {
    @Expose()
        id: number;

    @Expose()
        name: string;

    @Expose()
        description: string;
}
