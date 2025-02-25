import {Button} from "@/components/ui/button";
import {useEntityManager} from "@/hooks/useEntityActions";
import {useDuplicateSprint} from "@/services/sprint";
import {SprintDto} from "@minira/server";
import {t} from "i18next";
import {FC} from "react";
import SprintDuplicateForm from "./sprint-duplicate-form";

interface ISprintDuplicate {
    sprints: SprintDto[] | undefined;
    onSuccess: () => void;
}

const SprintDuplicate: FC<ISprintDuplicate> = ({ sprints, onSuccess }) => {
    const entityManager = useEntityManager<SprintDto>();

    if (!entityManager.handleClose) {
        entityManager.handleClose = onSuccess;
    }

    const { mutate: duplicateSprint, isPending } = useDuplicateSprint(onSuccess);

    return (
        <>
            <Button onClick={entityManager.handleCreate} variant="outline">
                {t("Duplicate sprint")}
            </Button>
            {entityManager.isCreating &&
                (sprints ? (
                    <SprintDuplicateForm
                        title="Duplicate Sprint"
                        sprints={sprints}
                        isPending={isPending}
                        onSubmit={duplicateSprint}
                        onClose={entityManager.handleClose}
                    />
                ) : (
                    // Alert with warning, no duplicatable sprints
                    <div />
                ))}
        </>
    );
};

export default SprintDuplicate;
