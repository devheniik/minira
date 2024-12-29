import JobTitleForm from "@/views/job-titles/components/job-title-form.tsx";
import { CreateJobTitleDto } from "@minira/server";
import { useCreateJobTitle } from "@/services/job-title.ts";

const JobTitleCreate = ({
    onSuccess,
    onClose,
}: {
    onSuccess: () => void;
    onClose?: () => void;
}) => {
    const jobTitle: CreateJobTitleDto = {
        name: "",
        description: "",
    };

    if (!onClose) {
        onClose = onSuccess;
    }

    const { mutate: createJobTitle, isPending } = useCreateJobTitle(onSuccess);

    return (
        <>
            <JobTitleForm
                title="Create Job Title"
                jobTitle={jobTitle}
                isPending={isPending}
                onSubmit={createJobTitle}
                onClose={onClose}
            />
        </>
    );
};

export default JobTitleCreate;
