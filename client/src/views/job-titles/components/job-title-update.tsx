import JobTitleForm from "@/views/job-titles/components/job-title-form.tsx";
import { JobTitleDto } from "@minira/server";
import { useUpdateJobTitle } from "@/services/job-title.ts";

const JobTitleUpdate = ({
    jobTitle,
    onSuccess,
    onClose,
}: {
    jobTitle: JobTitleDto;
    onSuccess: () => void;
    onClose?: () => void;
}) => {
    if (!onClose) {
        onClose = onSuccess;
    }

    const { mutate: updateJobTitle, isPending } = useUpdateJobTitle(
        jobTitle.id,
        onSuccess,
    );

    return (
        <>
            <JobTitleForm
                title="Update Job Title"
                jobTitle={jobTitle}
                isPending={isPending}
                onSubmit={updateJobTitle}
                onClose={onClose}
            />
        </>
    );
};

export default JobTitleUpdate;
