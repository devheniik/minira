import { SprintDto } from "@minira/server";
import { formatSprintDateRange } from "@/lib/date.formatter";
import { Button } from "@/components/ui/button";
import { t } from "i18next";

// !!! Remove !!!
const YUMMY_DATA = {
    task: "Tasks: 25",
    assigned: "Assigned User: 5",
};

const SprintCard = ({
    sprint,
    onUpdate,
    onDelete,
}: {
    sprint: SprintDto;
    onUpdate: (sprint: SprintDto) => void;
    onDelete: (sprint: SprintDto) => void;
}) => {
    return (
        <li
            key={sprint.id}
            className="flex justify-between items-center w-full bg-gray-100 px-4 py-6 mt-4 rounded-lg"
        >
            <div className="flex flex-col">
                <h3 className="text-sm">
                    {formatSprintDateRange(sprint.startDate, sprint.endDate)}
                </h3>
                <span className="text-xs text-gray-400">{YUMMY_DATA.task}</span>
                <span className="text-xs text-gray-400">
                    {YUMMY_DATA.assigned}
                </span>
            </div>
            <div className="flex gap-3 items-center">
                <Button onClick={() => onUpdate(sprint)}>{t("Edit")}</Button>
                <Button variant="destructive" onClick={() => onDelete(sprint)}>
                    {t("Delete")}
                </Button>
            </div>
        </li>
    );
};

export default SprintCard;
