import {Link, useParams} from "react-router";
import {FC, useState} from "react";
import {useGetSprintById} from "@/services/sprint.ts";
import {CreateIssueDto, CreateLogDto, IssueTableDto} from "@minira/server";
import {useEntityManager} from "@/hooks/useEntityActions.ts";
import CreateTimeLogForm from "@/views/sprints/components/calendar/create-time-log-form";
import {useCreateLog} from "@/services/log.ts";
import SprintViewTable from "@/views/sprints/components/calendar/sprint-view-table";
import {Button} from "@/components/ui/button.tsx";
import {Icon} from "@/components/wrappers/icon.tsx";
import {t} from "i18next";
import {formatDateRange} from "@/lib/date.formatter.ts";
import IssueCreate from "@/views/issue/components/issue-create.tsx";
import IssueUpdate from "@/views/issue/components/issue-update.tsx";
import {useDuplicateIssue} from "@/services/issue.ts";

const SprintCalendarView: FC = () => {
    const { id = -1 } = useParams<{ id: string }>();

    const { data, isPending, refetch } = useGetSprintById(+id);

    const entityManager = useEntityManager<CreateLogDto>();

    const { mutate: createLog, isPending: isPendingCreate } = useCreateLog(
        async () => {
            await refetch();
            entityManager.handleClose();
        },
    );

    const issueEntityManager = useEntityManager<CreateIssueDto, IssueTableDto>();

    const [duplicateIssue, setDuplicateIssue] = useState<Partial<CreateIssueDto> | null>(null);
    const duplicateIssueFn = useDuplicateIssue();

    const issueHandled = async () => {
        issueEntityManager.handleClose();
        setDuplicateIssue(null);
        await refetch()
    }

    const handleDuplicate = (issue: IssueTableDto) => {
        setDuplicateIssue(duplicateIssueFn(issue));
        issueEntityManager.handleCreate();
    };

    return (
        <div>
            <div className="w-full flex flex-col">
                <div>
                    <Link to={'/sprints'}>
                        <Button variant={'outline'} onClick={() => window.history.back()}>
                            <Icon className={'text-gray-50'} name={'left'} size={20} />
                            <span>
                                {t('common.back')}
                            </span>
                        </Button>
                    </Link>
                </div>
                <div className="flex justify-between items-center p-5">
                    {!isPending && data && (
                        <div className="flex flex-col space-y-1">
                            <h6 className="text-2xl">
                                {data.name}
                            </h6>
                            <div>
                                {formatDateRange(data.startDate, data.endDate)}
                            </div>
                        </div>
                    )}
                    <Button onClick={issueEntityManager.handleCreate}>
                        {t('issue.create')}
                    </Button>
                </div>
            </div>
            {!isPending && data && (
                <SprintViewTable
                    data={data}
                    onEdit={issueEntityManager.handleUpdate}
                    onDuplicate={handleDuplicate}
                    onCreate={
                        entityManager.handleCreateWithEntity as (
                            sprint: CreateLogDto,
                        ) => void
                    }
                />
            )}
            <div className="mt-4 text-right">
                {entityManager.isCreating && (
                    <CreateTimeLogForm
                        logData={entityManager.creatableEntity as CreateLogDto}
                        isPending={isPendingCreate}
                        onSubmit={createLog}
                        onClose={entityManager.handleClose}
                    />
                )}
            </div>
            {
                issueEntityManager.isCreating && (
                    <IssueCreate
                        sprintId={data?.id as number}
                        onSuccess={issueHandled}
                        onClose={issueEntityManager.handleClose}
                        predefinedIssue={duplicateIssue || undefined}
                    />
                )
            }
            {
                issueEntityManager.updatableEntity && (
                    <IssueUpdate
                        sprintId={id as number}
                        issue={issueEntityManager.updatableEntity as IssueTableDto}
                        onSuccess={issueHandled}
                        onClose={issueEntityManager.handleClose}
                    />
                )
            }
        </div>
    );
};

export default SprintCalendarView;
