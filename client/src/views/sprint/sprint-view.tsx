import { useParams } from "react-router";
import { FC, useEffect } from "react";
import { useDeleteSprint, useGetSprintById } from "@/services/sprint";
import { SprintDto, SprintViewDto } from "@minira/server";
import SprintViewTable from "./components/sprint-view-table";
import { useSingleEntityActions } from "@/hooks/useEntityActions";
import SprintViewCreate from "./components/spint-view-create";

const SprintView: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { dataById, onSuccess, entityManager } =
        useSingleEntityActions<SprintDto>({
            useDelete: useDeleteSprint,
            useGetById: useGetSprintById,
            id: id ? +id : undefined || -1,
        });

    useEffect(() => {
        console.log(dataById);
    }, [dataById]);

    return (
        <div>
            {/*TODO: fix types */}
            {dataById && (
                <SprintViewTable
                    data={dataById as SprintViewDto}
                    onCreate={entityManager.handleCreateWithEntity}
                />
            )}
            <div className="mt-4 text-right">
                {entityManager.isCreating && (
                    <SprintViewCreate
                        logData={entityManager.creatableEntity}
                        onSuccess={onSuccess}
                        onClose={entityManager.handleClose}
                    />
                )}
            </div>
        </div>
    );
};

export default SprintView;
