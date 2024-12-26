import { Expose, plainToInstance, Transform } from 'class-transformer';
import { IssueTransformer } from '../../issue/transformers/issue.transformer';

export class SprintViewTransformer {
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

    @Expose()
    @Transform(({ value }) => value.map((task) => task.issue))
    @Transform(({ value }) =>
        plainToInstance(IssueTransformer, value, {
            excludeExtraneousValues: true,
        }),
    )
        issues: IssueTransformer[];
}
