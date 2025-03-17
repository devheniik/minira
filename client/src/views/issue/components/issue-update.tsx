import {IssueTableDto, UpdateIssueDto} from "@minira/server";
import {useDeleteIssue, useUnbindIssueFromSprint, useUpdateIssue} from "@/services/issue.ts";
import IssueForm from "@/views/issue/components/issue-form.tsx";
import {t} from "i18next";

const IssueUpdate = ({
    issue,
    onSuccess,
    onClose,
    sprintId, // Add this prop
}: {
    issue: IssueTableDto;
    onSuccess: () => void;
    onClose?: () => void;
    sprintId?: number; // Add this prop to know which sprint to unbind from
}) => {
    if (!onClose) {
        onClose = onSuccess;
    }

    const { mutate: updateIssue, isPending: isUpdatePending } = useUpdateIssue(
        issue.id,
        onSuccess,
    );

    const { mutate: deleteIssue, isPending: isDeletePending } = useDeleteIssue(
        onSuccess,
    );

    const { mutate: unbindIssue, isPending: isUnbindPending } = useUnbindIssueFromSprint(
        sprintId || 0,
        onSuccess,
    );

    const isPending = isUpdatePending || isDeletePending || isUnbindPending;

    const handleDelete = () => {
        if (confirm(t('issue.confirmDelete'))) {
            deleteIssue(issue.id);
        }
    };

    const handleUnbind = () => {
        if (sprintId && confirm(t('issue.confirmUnbind'))) {
            unbindIssue([issue.id]);
        }
    };

    return (
        <>
            <IssueForm
                title="Update Job Title"
                issue={issue}
                isPending={isPending}
                onSubmit={(issue: IssueTableDto) => updateIssue(issue as UpdateIssueDto)}
                onClose={onClose}
                extraButtons={([
                    {
                        text: t('common.actions.delete'),
                        onClick: handleDelete,
                        variant: 'destructive',
                        disabled: isDeletePending
                    },
                    sprintId ? {
                        text: t('issue.unbind'),
                        onClick: handleUnbind,
                        variant: 'outline',
                        disabled: isUnbindPending
                    } : null
                ] as Array<{
                    text: string;
                    onClick: () => void;
                    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
                    disabled?: boolean;
                } | null>).filter(Boolean)}
            />
        </>
    );
};

export default IssueUpdate;