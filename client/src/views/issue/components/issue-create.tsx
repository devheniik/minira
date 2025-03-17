import {CreateIssueDto} from "@minira/server";
import {useCreateIssue} from "@/services/issue";
import IssueForm from "@/views/issue/components/issue-form.tsx";
import {t} from "i18next";

const IssueCreate = ({
    onSuccess,
    onClose,
    sprintId,
    predefinedIssue
}: {
    onSuccess: () => void;
    onClose?: () => void;
    sprintId: number;
    predefinedIssue?: Partial<CreateIssueDto>;
}) => {
    const issue: CreateIssueDto = {
        name: predefinedIssue?.name || "",
        description: predefinedIssue?.description || "",
        originalEstimate: predefinedIssue?.originalEstimate || 4,
        memberId: predefinedIssue?.memberId || (-1 as never),
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
                title={predefinedIssue ? t('issue.duplicate') : t('issue.create')}
                issue={issue}
                isPending={isPending}
                onSubmit={handleSubmit}
                onClose={onClose}
            />
        </>
    );
};

export default IssueCreate;