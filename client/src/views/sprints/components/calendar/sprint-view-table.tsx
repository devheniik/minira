import {FC} from "react";
import {Table, TableBody, TableCell, TableHeader, TableRow,} from "@/components/ui/table.tsx";
import {CreateLogDto, IssueTableDto, SprintViewDto} from "@minira/server";
import {formatDateShortcut} from "@/lib/date.formatter.ts";
import {t} from "i18next";
import {Icon} from "@/components/wrappers/icon.tsx";

interface ISprintViewTable {
    data: SprintViewDto;
    onCreate: (sprint: CreateLogDto) => void;
    onEdit: (issue: IssueTableDto) => void;
}

export type ICell = {
    remaining: number;
    spentTime: number;
};

const SprintViewTable: FC<ISprintViewTable> = ({ data, onCreate, onEdit }) => {
    const handleClick = (cell: ICell, issue: IssueTableDto, date: string): void => {
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
                                (data as SprintViewDto).issues[0]?.table ?? {},
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
                                <TableCell>
                                    <div className="flex flex-row justify-between items-center">
                                        <span>{issue.name}</span>
                                        <Icon
                                            name="settings"
                                            onClick={() => onEdit(issue)}
                                            size={12}
                                            className={'cursor-pointer'}/>
                                    </div>
                                </TableCell>
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
                                                        .issues[0]?.table ?? {},
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
