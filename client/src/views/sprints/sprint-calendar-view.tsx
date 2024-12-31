import {Link, useParams} from "react-router";
import {FC} from "react";
import {useGetSprintById} from "@/services/sprint.ts";
import {CreateIssueDto, CreateLogDto} from "@minira/server";
import {useEntityManager} from "@/hooks/useEntityActions.ts";
import CreateTimeLogForm from "@/views/sprints/components/calendar/create-time-log-form";
import {useCreateLog} from "@/services/log.ts";
import SprintViewTable from "@/views/sprints/components/calendar/sprint-view-table";
import {Button} from "@/components/ui/button.tsx";
import {Icon} from "@/components/wrappers/icon.tsx";
import {t} from "i18next";
import {formatDateRange} from "@/lib/date.formatter.ts";
import IssueCreate from "@/views/issue/components/issue-create.tsx";

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

    const issueEntityManager = useEntityManager<CreateIssueDto>();

    const issueCreated = async () => {
        issueEntityManager.handleClose();
        await refetch()
    }

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
                        onSuccess={issueCreated}
                        onClose={issueEntityManager.handleClose}
                    />
                )
            }
        </div>
    );
};

export default SprintCalendarView;
