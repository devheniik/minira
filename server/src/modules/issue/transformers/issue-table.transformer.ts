import { Expose, Transform } from 'class-transformer';
import { Issue, Member, TimeLog } from '@prisma/client';

export class IssueTableTransformer {
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
    @Transform(({ value }: { value: Member }) => value.fullName)
        member: string;

    @Expose()
        parentIssueId: number;

    @Expose()
        timeLogs: TimeLog[];

    @Expose()
    @Transform(
        ({
            value,
            obj,
        }: {
            value: TimeLog[];
            obj: Issue & {
                sprintStartDate: string;
                sprintEndDate: string;
                timeLogs: TimeLog[];
            };
        }) => {
            value = obj.timeLogs;
            const sprintStart = new Date(obj.sprintStartDate);
            const sprintEnd = new Date(obj.sprintEndDate);

            const emptyLogs: Record<
                string,
                { remaining: number; spentTime: number }
            > = {};

            for (
                let d = new Date(sprintStart);
                d < sprintEnd;
                d.setDate(d.getDate() + 1)
            ) {
                emptyLogs[d.toISOString().split('T')[0]] = {
                    remaining: obj.originalEstimate,
                    spentTime: 0,
                };
            }

            if (!value.length) {
                return emptyLogs;
            }

            const firstLogDate = value.sort(
                (a, b) =>
                    new Date(a.logDate).getTime() -
                    new Date(b.logDate).getTime(),
            )[0]?.logDate;

            if (!firstLogDate) {
                return emptyLogs;
            }

            const dates: {
                date: string; // Format: YYYY-MM-DD
                data: { remaining: number; spentTime: number };
            }[] = [];

            const tempData = {
                remaining: obj.originalEstimate,
                spentTime: 0,
            };

            const startPoint =
                firstLogDate > sprintStart ? sprintStart : firstLogDate;

            for (
                let d = new Date(startPoint);
                d < sprintEnd;
                d.setDate(d.getDate() + 1)
            ) {
                const dateKey = d.toISOString().split('T')[0]; // Format: YYYY-MM-DD

                const log = value.find(
                    (log) =>
                        new Date(log.logDate).toISOString().split('T')[0] ===
                        dateKey,
                );

                if (log) {
                    tempData.remaining -= log.spentTime;
                    tempData.spentTime += log.spentTime;
                }

                dates.push({
                    date: dateKey,
                    data: {
                        remaining: tempData.remaining,
                        spentTime: tempData.spentTime,
                    },
                });
            }

            dates.filter(
                (date) =>
                    new Date(date.date) >= sprintStart &&
                    new Date(date.date) <= sprintEnd,
            );

            const dailyLogs: Record<
                string,
                { remaining: number; spentTime: number }
            > = dates.reduce((acc, date) => {
                acc[date.date] = date.data;
                return acc;
            }, {});

            return dailyLogs;
        },
    )
        table: Record<string, { remaining: number; spentTime: number }>;
}
