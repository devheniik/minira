import { FC } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableBody,
} from "@/components/ui/table";
import { CreateLogDto, IssueDto, SprintViewDto } from "@minira/server";
import { formatDateShortcut } from "@/lib/date.formatter";

interface ISprintViewTable {
    data: SprintViewDto;
    onCreate: (sprint: CreateLogDto) => void;
}

export type ITable = {
    remaining: number;
    spentTime: number;
};

const SprintViewTable: FC<ISprintViewTable> = ({ data, onCreate }) => {
    const handleClick = (t: ITable, issue: IssueDto, date: string): void => {
        const logData: CreateLogDto = {
            remainingTime: +t.remaining,
            spentTime: +t.spentTime,
            issueId: +issue.id,
            logDate: date,
        };
        onCreate(logData);
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Estimate</TableCell>
                        {data &&
                            Object.keys(
                                (data as SprintViewDto).issues[0].table,
                            ).map((t) => (
                                <TableCell key={t}>
                                    {formatDateShortcut(t)}
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* Fix SprintViewDto */}
                    {data &&
                        (data as SprintViewDto).issues.map((issue) => (
                            <TableRow key={issue.id}>
                                <TableCell>{issue.name}</TableCell>
                                <TableCell>{issue.originalEstimate}</TableCell>
                                {Object.values(issue.table).map((t, idx) => (
                                    <TableCell
                                        className="cursor-pointer hover:bg-gray-200 transition duration-200 ease-in-out"
                                        onClick={() =>
                                            handleClick(
                                                t,
                                                issue,
                                                Object.keys(
                                                    (data as SprintViewDto)
                                                        .issues[0].table,
                                                )[idx],
                                            )
                                        }
                                        key={idx}
                                    >
                                        {t.remaining}
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
