import SprintForm from "@/views/sprints/components/sprint/sprint-form";
import { CreateSprintDto } from "@minira/server";
import { useCreateSprint } from "@/services/sprint.ts";

const SprintCreate = ({
    onSuccess,
    onClose,
}: {
    onSuccess: () => void;
    onClose?: () => void;
}) => {
    const sprint: CreateSprintDto = {
        name: "",
        description: "",
        startDate: "",
        endDate: "",
    };

    if (!onClose) {
        onClose = onSuccess;
    }

    const { mutate: createSprint, isPending } = useCreateSprint(onSuccess);

    return (
        <>
            <SprintForm
                title="Create Sprint"
                sprint={sprint}
                isPending={isPending}
                onSubmit={createSprint}
                onClose={onClose}
            />
        </>
    );
};

export default SprintCreate;
