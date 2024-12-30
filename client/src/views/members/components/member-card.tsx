import { t } from "i18next";
import { Button } from "@/components/ui/button";
import { MemberDto } from "@minira/server";
import { Icon } from "@/components/wrappers/icon.tsx";

const MemberCard = ({
    member,
    onUpdate,
    onDelete,
}: {
    member: MemberDto;
    onUpdate: (member: MemberDto) => void;
    onDelete: (member: MemberDto) => void;
}) => {
    return (
        <li className="flex justify-between items-center w-full bg-gray-100 px-4 py-6 mt-4 rounded-lg">
            <div className="flex items-center gap-3">
                <Icon name={"user"} size={48} />
                <div className="flex flex-col">
                    <span className="text-sm">{member.fullName}</span>
                    <span className="text-xs text-gray-400">
                        {member.jobTitle}
                    </span>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <Button variant="outline" onClick={() => onDelete(member)}>
                    {t("Delete")}
                </Button>
                <Button onClick={() => onUpdate(member)}>{t("Edit")}</Button>
            </div>
        </li>
    );
};

export default MemberCard;
