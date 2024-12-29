import { useDeleteSprint, useGetAllSprint } from "@/services/sprint.ts";
import { SprintDto } from "@minira/server";
import { useEntityActions } from "@/hooks/useEntityActions.ts";
import SprintCard from "./components/sprint-card";
import { Button } from "@/components/ui/button";
import { t } from "i18next";
import SprintCreate from "@/views/sprints/components/sprint-create";
import SprintUpdate from "@/views/sprints/components/sprint-update";
import CrossSvgComponent from "@/components/svg/CrossSvgComponent";
import useConfirmDialog from "@/hooks/useConfirmDialog.tsx";
import { FC } from "react";

const SprintsView: FC = () => {
    const { data, isPending, deleteEntity, onSuccess, entityManager } =
        useEntityActions<SprintDto>({
            useGetAll: useGetAllSprint,
            useDelete: useDeleteSprint,
        });

    const { openConfirmDialog, ConfirmDialogComponent } = useConfirmDialog();

    const handleDelete = (sprint: SprintDto): void => {
        openConfirmDialog(() => deleteEntity(sprint.id));
    };

    if (isPending) return <div />;

    return (
        <>
            <div className="flex items-center justify-between gap-4">
                <h6 className="text-2xl">Sprints</h6>
                <div className="flex justify-end ">
                    <Button onClick={entityManager.handleCreate}>
                        {t("Add sprint")}
                        <CrossSvgComponent />
                    </Button>
                </div>
            </div>
            <ul>
                {data?.map((sprint) => (
                    <SprintCard
                        key={sprint.id}
                        sprint={sprint}
                        onUpdate={entityManager.handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>
            <ConfirmDialogComponent
                title={t("Confirm Deletion")}
                message={t("Are you sure you want to delete this sprint?")}
            />
            <div className="mt-4 text-right">
                {entityManager.isCreating && (
                    <SprintCreate
                        onSuccess={onSuccess}
                        onClose={entityManager.handleClose}
                    />
                )}
                {entityManager.updatableEntity && (
                    <SprintUpdate
                        sprint={entityManager.updatableEntity}
                        onSuccess={onSuccess}
                        onClose={entityManager.handleClose}
                    />
                )}
            </div>
        </>
    );
};

export default SprintsView;
