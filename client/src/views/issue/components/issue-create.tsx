import {CreateIssueDto} from "@minira/server";
import {useCreateIssue} from "@/services/issue";
import IssueForm from "@/views/issue/components/issue-form.tsx";
import {t} from "i18next";

const IssueCreate = ({
    onSuccess,
    onClose,
    sprintId
}: {
    onSuccess: () => void;
    onClose?: () => void;
    sprintId: number
}) => {
    const issue: CreateIssueDto = {
        name: "",
        description: "",
        originalEstimate: 4,
        memberId: -1 as never,
        parentIssueId: undefined as never,
        sprintId: 0,
        type: "task",
    };

    if (!onClose) {
        onClose = onSuccess;
    }

    const { mutate: createIssue, isPending } = useCreateIssue(onSuccess);

    const handleSubmit = async (createIssueDto: CreateIssueDto) => {
        createIssue({
            ...createIssueDto,
            sprintId
        });
    }

    return (
        <>
            <IssueForm
                title={t('issue.create')}
                issue={issue}
                isPending={isPending}
                onSubmit={handleSubmit}
                onClose={onClose}
            />
        </>
    );
};

export default IssueCreate;
