import MemberForm from "@/views/members/components/member-form.tsx";
import { CreateMemberDto } from "@minira/server";
import { useCreateMember } from "@/services/member.ts";

const MemberUpdate = ({
    onSuccess,
    onClose,
}: {
    onSuccess: () => void;
    onClose?: () => void;
}) => {
    const member: CreateMemberDto = {
        fullName: "",
        jobTitleId: 0,
    };

    if (!onClose) {
        onClose = onSuccess;
    }

    const { mutate: updateUser, isPending } = useCreateMember(onSuccess);

    return (
        <>
            <MemberForm
                title="Create Member"
                member={member}
                isPending={isPending}
                onSubmit={updateUser}
                onClose={onClose}
            />
        </>
    );
};

export default MemberUpdate;
