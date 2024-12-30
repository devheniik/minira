import { t } from "i18next";
import { Button } from "@/components/ui/button";
import { JobTitleDto } from "@minira/server";

const JobTitleCard = ({
    jobTitle,
    onUpdate,
    onDelete,
}: {
    jobTitle: JobTitleDto;
    onUpdate: (jobTitle: JobTitleDto) => void;
    onDelete: (jobTitle: JobTitleDto) => void;
}) => {
    return (
        <li className="flex justify-between items-center w-full bg-gray-100 px-4 py-6 mt-4 rounded-lg">
            <div className="flex items-center gap-3">
                <div className="flex flex-col">
                    <span className="text-sm">{jobTitle.name}</span>
                    <span className="text-xs text-gray-400">
                        {jobTitle?.description}
                    </span>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <Button variant="outline" onClick={() => onDelete(jobTitle)}>
                    {t("Delete")}
                </Button>
                <Button onClick={() => onUpdate(jobTitle)}>{t("Edit")}</Button>
            </div>
        </li>
    );
};

export default JobTitleCard;
