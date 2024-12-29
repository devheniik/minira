import { Expose } from 'class-transformer';

export class IssueTransformer {
    @Expose()
        id: number;

    @Expose()
        name: string;

    @Expose()
        description: string;

    @Expose()
        originalEstimate: number;

    @Expose()
        remainingTime: number;

    @Expose()
        spentTime: number;

    @Expose()
        status: string;

    @Expose()
        type: string;

    @Expose()
        memberId: number;

    @Expose()
        parentIssueId: number;

    // create data based on start and end date
}
