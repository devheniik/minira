import {IssueDto} from "@minira/server";
import {useUpdateIssue} from "@/services/issue.ts";
import IssueForm from "@/views/issue/components/issue-form.tsx";

const IssueUpdate = ({
    issue,
    onSuccess,
    onClose,
}: {
    issue: IssueDto;
    onSuccess: () => void;
    onClose?: () => void;
}) => {
    if (!onClose) {
        onClose = onSuccess;
    }

    const { mutate: updateIssue, isPending } = useUpdateIssue(
        issue.id,
        onSuccess,
    );

    return (
        <>
            <IssueForm
                title="Update Job Title"
                issue={issue}
                isPending={isPending}
                onSubmit={updateIssue}
                onClose={onClose}
            />
        </>
    );
};

export default IssueUpdate;
