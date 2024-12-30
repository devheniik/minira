import { useParams } from "react-router";
import { FC } from "react";
import { useGetSprintById } from "@/services/sprint.ts";
import { CreateLogDto } from "@minira/server";
import { useEntityManager } from "@/hooks/useEntityActions.ts";
import CreateTimeLogForm from "@/views/sprints/components/calendar/create-time-log-form";
import { useCreateLog } from "@/services/log.ts";
import SprintViewTable from "@/views/sprints/components/calendar/sprint-view-table";

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

    return (
        <div>
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
        </div>
    );
};

export default SprintCalendarView;
