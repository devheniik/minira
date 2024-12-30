import {FC} from "react";
import {Table, TableBody, TableCell, TableHeader, TableRow,} from "@/components/ui/table.tsx";
import {CreateLogDto, IssueDto, SprintViewDto} from "@minira/server";
import {formatDateShortcut} from "@/lib/date.formatter.ts";
import {t} from "i18next";

interface ISprintViewTable {
    data: SprintViewDto;
    onCreate: (sprint: CreateLogDto) => void;
}

export type ICell = {
    remaining: number;
    spentTime: number;
};

const SprintViewTable: FC<ISprintViewTable> = ({ data, onCreate }) => {
    const handleClick = (cell: ICell, issue: IssueDto, date: string): void => {
        onCreate({
            remainingTime: +cell.remaining,
            spentTime: +cell.spentTime,
            issueId: +issue.id,
            logDate: date,
        });
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>{t('common.name')}</TableCell>
                        <TableCell>{t('common.assignee')}</TableCell>
                        <TableCell>{t('common.estimate')}</TableCell>
                        {data &&
                            Object.keys(
                                (data as SprintViewDto).issues[0].table,
                            ).map((date) => (
                                <TableCell key={date}>
                                    {formatDateShortcut(date)}
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data &&
                        (data as SprintViewDto).issues.map((issue) => (
                            <TableRow key={issue.id}>
                                <TableCell>{issue.name}</TableCell>
                                <TableCell>{issue.member}</TableCell>
                                <TableCell>{issue.originalEstimate}</TableCell>
                                {Object.values(issue.table).map((cell, idx) => (
                                    <TableCell
                                        className="cursor-pointer hover:bg-gray-200 transition duration-200 ease-in-out"
                                        onClick={() =>
                                            handleClick(
                                                cell,
                                                issue,
                                                Object.keys(
                                                    (data as SprintViewDto)
                                                        .issues[0].table,
                                                )[idx],
                                            )
                                        }
                                        key={idx}
                                    >
                                        {cell.remaining}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    );
};

export default SprintViewTable;
