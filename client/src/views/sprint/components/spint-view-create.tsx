import SprintViewForm from "@/views/sprint/components/sprint-view-form.jsx";
import { CreateLogDto } from "@minira/server";
import { useCreateLog } from "@/services/log";
import { FC } from "react";

interface ISprintViewUpdate {
    logData: CreateLogDto;
    onSuccess: () => void;
    onClose?: () => void;
}

const SprintViewUpdate: FC<ISprintViewUpdate> = ({
    logData,
    onSuccess,
    onClose,
}) => {
    if (!onClose) {
        onClose = onSuccess;
    }

    const { mutate: createLog, isPending } = useCreateLog(onSuccess);

    return (
        <>
            <SprintViewForm
                title="Update Time"
                logData={logData}
                isPending={isPending}
                onSubmit={createLog}
                onClose={onClose}
            />
        </>
    );
};

export default SprintViewUpdate;
