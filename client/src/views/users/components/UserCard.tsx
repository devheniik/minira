import useJobTitleMutations from "@/hooks/useJobTitleMutations";
import { JobTitle } from "@/hooks/useJobTitles.ts";
import { Button } from "@/components/ui/button";
import UpdateUserDialog from "./UpdateUserDialog";

interface JobTitleCard {
    title: JobTitle;
}
const UserCard = ({ title }: JobTitleCard) => {
    const { id, name, description } = title;
    const { mutate: deleteUser } = useJobTitleMutations();

    // We can add here onError popup and dialog "Are you sure"
    const handleDelete = (id: number) => {
        deleteUser({ action: "delete", id });
    };

    return (
        <li className="flex justify-between items-center w-full bg-gray-100 px-4 py-6 mt-4 rounded-lg">
            <div className="flex items-center gap-3">
                <img
                    src="/public/images/login/login.png"
                    className="w-12 h-12 rounded-full"
                    alt=""
                />
                <div className="flex flex-col">
                    <span className="text-sm">{name}</span>
                    <span className="text-xs text-gray-400">{description}</span>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <Button variant="destructive" onClick={() => handleDelete(id)}>
                    Delete
                </Button>
                <UpdateUserDialog id={id} />
            </div>
        </li>
    );
};

export default UserCard;
