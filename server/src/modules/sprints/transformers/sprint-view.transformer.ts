import { Expose, plainToInstance, Transform } from 'class-transformer';
import { IssueTableTransformer } from '../../issue/transformers/issue-table.transformer';

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
    @Transform(({ value, obj }) =>
        value.map((task) => ({
            ...task.issue,
            sprintStartDate: obj.startDate,
            sprintEndDate: obj.endDate,
        })),
    )
    @Transform(({ value }) =>
        plainToInstance(IssueTableTransformer, value, {
            excludeExtraneousValues: true,
        }),
    )
        issues: IssueTableTransformer[];
}
