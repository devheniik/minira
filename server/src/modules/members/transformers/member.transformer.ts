import { Expose, Transform } from 'class-transformer';

export class MemberTransformer {
    @Expose()
        id: number;

    @Expose()
        fullName: string;

    @Expose()
    @Transform(({ obj }) => obj.jobTitle?.name)
        jobTitle: string;

    @Expose()
        jobTitleId: number;
}
