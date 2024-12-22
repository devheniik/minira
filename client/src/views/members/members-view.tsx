import MemberCard from "./components/member-card.tsx";
import {useDeleteMember, useGetAllMembers} from "@/services/member.ts";
import {MemberDto} from "@minira/server";
import {t} from "i18next";
import MemberCreate from "@/views/members/components/member-create.tsx";
import MemberUpdate from "@/views/members/components/member-update.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEntityActions} from "@/hooks/useEntityActions.ts";

const MembersView = () => {
    const { data, isPending, deleteEntity, onSuccess, entityManager } = useEntityActions<MemberDto>({
        useGetAll: useGetAllMembers,
        useDelete: useDeleteMember,
    });

    if (isPending) return <div/>;

    return (
        <>
            <ul className="w-full">
                {
                    data?.map((member) => (
                        <MemberCard
                            key={member.id}
                            member={member}
                            onUpdate={entityManager.handleUpdate}
                            onDelete={(m) => deleteEntity(m.id)}
                        />
                    ))
                }
            </ul>
            <div className="flex justify-end px-4">
                <Button onClick={entityManager.handleCreate}>{t('Create member')}</Button>
            </div>
            <div className="mt-4 text-right">
                {entityManager.isCreating && <MemberCreate onSuccess={onSuccess} onClose={entityManager.handleClose} />}
                {entityManager.updatableEntity && <MemberUpdate member={entityManager.updatableEntity} onSuccess={onSuccess} onClose={entityManager.handleClose} />}
            </div>
        </>
    );
};

export default MembersView;
