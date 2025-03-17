import {FC} from "react";
import {Table, TableBody, TableCell, TableHeader, TableRow,} from "@/components/ui/table.tsx";
import {CreateLogDto, IssueTableDto, SprintViewDto} from "@minira/server";
import {formatDateShortcut} from "@/lib/date.formatter.ts";
import {t} from "i18next";
import {Icon} from "@/components/wrappers/icon.tsx";

interface ISprintViewTable {
    data: SprintViewDto;
    onCreate: (sprint: CreateLogDto) => void;
    onDuplicate: (issue: IssueTableDto) => void;
    onEdit: (issue: IssueTableDto) => void;
}

export type ICell = {
    remaining: number;
    spentTime: number;
};

const isCurrentDate = (
    issue: { table: { [key: string]: unknown } },
    idx: number,
) => {
    return (
        new Date().getDate() ==
        new Date(Object.keys(issue.table)[idx]).getDate()
    );
};

const SprintViewTable: FC<ISprintViewTable> = ({ data, onCreate, onEdit, onDuplicate }) => {
    const handleClick = (
        cell: ICell,
        issue: IssueTableDto,
        date: string,
    ): void => {
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
                        <TableCell>{t("common.name")}</TableCell>
                        <TableCell>{t("common.assignee")}</TableCell>
                        <TableCell>{t("common.estimate")}</TableCell>
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
                                <TableCell width={'20%'}>
                                    <div className="flex flex-row justify-between items-center">
                                        <span className={'flex-1 w-10/12 truncate whitespace-break-spaces'}>{issue.name}</span>
                                        <div className="flex items-center gap-2">
                                            <Icon
                                                name="duplicate"
                                                onClick={() => onDuplicate(issue)}
                                                size={16}
                                                className={"cursor-pointer flex text-blue-500 hover:text-blue-700 hover:scale-110 transition duration-200 ease-in-out"}
                                            />
                                            <Icon
                                                name="settings"
                                                onClick={() => onEdit(issue)}
                                                size={12}
                                                className={"cursor-pointer flex hover:text-blue-700 hover:scale-110 transition duration-200 ease-in-out"}
                                            />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{issue.member}</TableCell>
                                <TableCell>{issue.originalEstimate}</TableCell>
                                {Object.values(issue.table).map((cell, idx) => (
                                    <TableCell
                                        className={`cursor-pointer hover:bg-gray-200 transition duration-200 ease-in-out ${isCurrentDate(issue, idx) && "bg-issue-current"}`}
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
