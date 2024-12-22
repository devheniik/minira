import { useDeleteSprint, useGetAllSprint } from "@/services/sprint.ts";
import { SprintDto } from "@minira/server";
import { useEntityActions } from "@/hooks/useEntityActions.ts";
import SprintCard from "./components/sprint-card";
import { Button } from "@/components/ui/button";
import { t } from "i18next";
import SprintCreate from "@/views/sprint/components/sprint-create";
import SprintUpdate from "@/views/sprint/components/sprint-update";

const SprintView = () => {
    const { data, isPending, deleteEntity, onSuccess, entityManager } =
        useEntityActions<SprintDto>({
            useGetAll: useGetAllSprint,
            useDelete: useDeleteSprint,
        });

    if (isPending) return <div />;

    return (
        <ul>
            {data?.map((sprint) => (
                <SprintCard
                    key={sprint.id}
                    sprint={sprint}
                    onUpdate={entityManager.handleUpdate}
                    onDelete={(s) => deleteEntity(s.id)}
                />
            ))}
            <div className="flex justify-end px-4 mt-3">
                <Button onClick={entityManager.handleCreate}>
                    {t("Create member")}
                </Button>
            </div>
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
        </ul>
    );
};

export default SprintView;
