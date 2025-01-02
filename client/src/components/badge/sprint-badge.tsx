import { Badge } from "@/components/ui/badge";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const SprintStatus = {
    Completed: "completed",
    Upcoming: "upcoming",
    Active: "active",
} as const;

type SprintStatus = (typeof SprintStatus)[keyof typeof SprintStatus];

interface SprintBadgeProps {
    className?: string;
    startDate: string;
    endDate: string;
}

const sprintBadgeVariants = cva(
    "max-w-fit py-1 px-4 capitalize text-black hover:bg-white",
    {
        variants: {
            variant: {
                [SprintStatus.Completed]: "bg-sprint-completed",
                [SprintStatus.Upcoming]: "bg-sprint-upcoming",
                [SprintStatus.Active]: "bg-sprint-active",
            },
        },
    },
);
const getSprintStatus = (startDate: string, endDate: string): SprintStatus => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now >= start && now <= end) return SprintStatus.Active;
    if (now < start) return SprintStatus.Upcoming;
    return SprintStatus.Completed;
};

const SprintBadge = ({
    className,
    startDate,
    endDate,
    ...props
}: SprintBadgeProps) => {
    const status = getSprintStatus(startDate, endDate);

    return (
        <Badge
            className={cn(sprintBadgeVariants({ variant: status }), className)}
            {...props}
        >
            {status}
        </Badge>
    );
};

export default SprintBadge;
