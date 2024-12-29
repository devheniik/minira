import { SprintDto } from "@minira/server";
import { formatDate } from "@/lib/date.formatter";
import { Button } from "@/components/ui/button";
import { t } from "i18next";
import { FC } from "react";
import { useNavigate } from "react-router";

interface ISprintCard {
    sprint: SprintDto;
    onUpdate: (sprint: SprintDto) => void;
    onDelete: (sprint: SprintDto) => void;
}

const SprintCard: FC<ISprintCard> = ({ sprint, onUpdate, onDelete }) => {
    // Here need to be status
    const navigate = useNavigate();

    return (
        <li
            key={sprint.id}
            className="flex justify-between items-center w-full bg-gray-100 px-4 py-6 mt-4 rounded-lg"
        >
            <div className="flex flex-col gap-[6px]">
                <h2 className="text-base">{sprint.name}</h2>
                <h3 className="text-sm text-orange-50">
                    {`${formatDate(sprint.startDate)} - ${formatDate(sprint.endDate)}`}
                </h3>
                <span className="text-xs text-gray-400">
                    {sprint.description}
                </span>
            </div>
            <div className="flex gap-3 items-center">
                <Button variant="outline" onClick={() => onDelete(sprint)}>
                    {t("Delete")}
                </Button>
                <Button onClick={() => onUpdate(sprint)}>{t("Edit")}</Button>
                <Button onClick={() => navigate(`/sprint/${sprint.id}`)}>
                    {t("View")}
                </Button>
            </div>
        </li>
    );
};

export default SprintCard;
