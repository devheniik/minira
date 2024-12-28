import { useDeleteSprint, useGetAllSprint } from "@/services/sprint.ts";
import { SprintDto } from "@minira/server";
import { useEntityActions } from "@/hooks/useEntityActions.ts";

import DashboardCard from "./components/dashboard-card";

const DashboardView = () => {
    const { data, isPending } = useEntityActions<SprintDto>({
        useGetAll: useGetAllSprint,
        useDelete: useDeleteSprint,
    });

    if (isPending) return <div />;

    return (
        <>
            <div className="flex items-center justify-between gap-4">
                <h6 className="text-2xl">Sprints</h6>
            </div>
            <ul className="grid grid-cols-2 gap-2	">
                {data?.map((sprint) => (
                    <DashboardCard key={sprint.id} sprint={sprint} />
                ))}
            </ul>
        </>
    );
};

export default DashboardView;
