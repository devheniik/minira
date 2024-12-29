import JobTitleCard from "./components/job-title-card.tsx";
import { useDeleteJobTitle, useGetAllJobTitles } from "@/services/job-title.ts";
import { JobTitleDto } from "@minira/server";
import { t } from "i18next";
import JobTitleCreate from "@/views/job-titles/components/job-title-create.tsx";
import JobTitleUpdate from "@/views/job-titles/components/job-title-update.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useEntityActions } from "@/hooks/useEntityActions.ts";
import CrossSvgComponent from "@/components/svg/CrossSvgComponent";
import useConfirmDialog from "@/hooks/useConfirmDialog.tsx";

const JobTitlesView = () => {
    const { data, isPending, deleteEntity, onSuccess, entityManager } =
        useEntityActions<JobTitleDto>({
            useGetAll: useGetAllJobTitles,
            useDelete: useDeleteJobTitle,
        });

    const { openConfirmDialog, ConfirmDialogComponent } = useConfirmDialog();

    const handleDelete = (jobTitle: JobTitleDto) => {
        openConfirmDialog(() => deleteEntity(jobTitle.id));
    };

    if (isPending) return <div />;

    return (
        <>
            <div className="flex items-center justify-between gap-4">
                <h6 className="text-2xl">Job Titles</h6>
                <div className="flex justify-end ">
                    <Button onClick={entityManager.handleCreate}>
                        {t("Add job title")}
                        <CrossSvgComponent />
                    </Button>
                </div>
            </div>
            <ul className="w-full">
                {data?.map((jobTitle) => (
                    <JobTitleCard
                        key={jobTitle.id}
                        jobTitle={jobTitle}
                        onUpdate={entityManager.handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>

            <ConfirmDialogComponent
                title={t("Confirm Deletion")}
                message={t("Are you sure you want to delete this job title?")}
            />

            <div className="mt-4 text-right">
                {entityManager.isCreating && (
                    <JobTitleCreate
                        onSuccess={onSuccess}
                        onClose={entityManager.handleClose}
                    />
                )}
                {entityManager.updatableEntity && (
                    <JobTitleUpdate
                        jobTitle={entityManager.updatableEntity}
                        onSuccess={onSuccess}
                        onClose={entityManager.handleClose}
                    />
                )}
            </div>
        </>
    );
};

export default JobTitlesView;
