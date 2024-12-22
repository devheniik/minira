import MemberForm from "@/views/members/components/member-form.tsx";
import {MemberDto} from "@minira/server";
import {useUpdateMember} from "@/services/member.ts";

const MemberUpdate = (
    {
        member,
        onSuccess,
        onClose
    }: {
        member: MemberDto,
        onSuccess: () => void
        onClose?: () => void
    }
) => {

    if (!onClose) {
        onClose = onSuccess
    }

    const {
        mutate: updateUser,
        isPending
    } = useUpdateMember(member.id, onSuccess)

    return (
        <>
            <MemberForm member={member} isPending={isPending} onSubmit={updateUser} onClose={onClose} />
        </>
    );
};

export default MemberUpdate;
