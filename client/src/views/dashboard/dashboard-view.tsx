import { useDeleteSprint, useGetAllSprint } from "@/services/sprint.ts";
import { SprintDto } from "@minira/server";
import { useEntityActions } from "@/hooks/useEntityActions.ts";

import DashboardCard from "./components/dashboard-card";
import { t } from "i18next";

const DashboardView = () => {
    const { data, isPending } = useEntityActions<SprintDto>({
        useGetAll: useGetAllSprint,
        useDelete: useDeleteSprint,
    });

    if (isPending) return <div />;

    return (
        <>
            <div className="flex items-center gap-6">
                <div className="max-w-36 max-h-36">
                    <img
                        src="/images/placeholder.png"
                        alt="Settings Board"
                        className="w-full object-cover h-full"
                    />
                </div>
                <h1 className="text-2xl	text-orange-50">{t("Minira")}</h1>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
                <h6 className="relative text-2xl before:block before:absolute before:bottom-[-12px] before:left-0 before:w-full before:h-px before:bg-orange-200">
                    Sprints
                </h6>
            </div>
            <ul className="grid grid-cols-2 gap-2	mt-3">
                {data?.map((sprint) => (
                    <DashboardCard key={sprint.id} sprint={sprint} />
                ))}
            </ul>
        </>
    );
};

export default DashboardView;
