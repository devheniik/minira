import MemberCard from "./components/member-card.tsx";
import { useDeleteMember, useGetAllMembers } from "@/services/member.ts";
import { MemberDto } from "@minira/server";
import { t } from "i18next";
import MemberCreate from "@/views/members/components/member-create.tsx";
import MemberUpdate from "@/views/members/components/member-update.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useEntityActions } from "@/hooks/useEntityActions.ts";
import CrossSvgComponent from "@/components/svg/CrossSvgComponent.tsx";
import useConfirmDialog from "@/hooks/useConfirmDialog.tsx";

const MembersView = () => {
    const { data, isPending, deleteEntity, onSuccess, entityManager } =
        useEntityActions<MemberDto>({
            useGetAll: useGetAllMembers,
            useDelete: useDeleteMember,
        });

    const { openConfirmDialog, ConfirmDialogComponent } = useConfirmDialog();

    const handleDelete = (member: MemberDto) => {
        openConfirmDialog(() => deleteEntity(member.id));
    };

    if (isPending) return <div />;

    return (
        <>
            <div className="flex items-center justify-between gap-4">
                <h6 className="text-2xl">Members</h6>
                <div className="flex justify-end ">
                    <Button onClick={entityManager.handleCreate}>
                        {t("Add member")}
                        <CrossSvgComponent />
                    </Button>
                </div>
            </div>
            <ul className="w-full">
                {data?.map((member) => (
                    <MemberCard
                        key={member.id}
                        member={member}
                        onUpdate={entityManager.handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>
            <ConfirmDialogComponent
                title={t("Confirm Deletion")}
                message={t("Are you sure you want to delete this member?")}
            />
            <div className="mt-4 text-right">
                {entityManager.isCreating && (
                    <MemberCreate
                        onSuccess={onSuccess}
                        onClose={entityManager.handleClose}
                    />
                )}
                {entityManager.updatableEntity && (
                    <MemberUpdate
                        member={entityManager.updatableEntity}
                        onSuccess={onSuccess}
                        onClose={entityManager.handleClose}
                    />
                )}
            </div>
        </>
    );
};

export default MembersView;
