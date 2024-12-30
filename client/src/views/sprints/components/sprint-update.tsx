import SprintForm from "@/views/sprints/components/sprint-form.tsx";
import { SprintDto } from "@minira/server";
import { useUpdateSprint } from "@/services/sprint.ts";

const SprintUpdate = ({
    sprint,
    onSuccess,
    onClose,
}: {
    sprint: SprintDto;
    onSuccess: () => void;
    onClose?: () => void;
}) => {
    if (!onClose) {
        onClose = onSuccess;
    }

    const { mutate: updateSprint, isPending } = useUpdateSprint(
        sprint.id,
        onSuccess,
    );

    return (
        <>
            <SprintForm
                title="Update Sprint"
                sprint={sprint}
                isPending={isPending}
                onSubmit={updateSprint}
                onClose={onClose}
            />
        </>
    );
};

export default SprintUpdate;
