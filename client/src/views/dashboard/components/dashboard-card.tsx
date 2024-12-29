import { SprintDto } from "@minira/server";
import { formatDate } from "@/lib/date.formatter";

const DashboardCard = ({ sprint }: { sprint: SprintDto }) => {
    return (
        <li
            key={sprint.id}
            className="h-auto max-w-full flex justify-between  w-full bg-gray-100 px-4 py-6  rounded-lg"
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
        </li>
    );
};

export default DashboardCard;
