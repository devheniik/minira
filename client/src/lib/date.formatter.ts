export const formatDate = (date: string | null | undefined): string => {
    if (!date) {
        return "Invalid date";
    }
    try {
        return new Date(date).toLocaleDateString();
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid date";
    }
};

export const formatDateTime = (date: string | null | undefined): string => {
    if (!date) {
        return "Invalid date";
    }
    try {
        return new Date(date).toLocaleString();
    } catch (error) {
        console.error("Error formatting date time:", error);
        return "Invalid date";
    }
};

export const formatDateRange = (
    startDate: string | null | undefined,
    endDate: string | null | undefined,
): string => {
    if (!startDate || !endDate) {
        return "Invalid date range";
    }
    try {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const options: Intl.DateTimeFormatOptions = {
            month: "long",
            day: "numeric",
            year: "numeric",
        };
        const formattedStart = start.toLocaleDateString(undefined, options);
        const formattedEnd = end.toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
        });

        return `Sprint: ${formattedStart.split(",")[0]} - ${formattedEnd}, ${end.getFullYear()}`;
    } catch (error) {
        console.error("Error formatting sprint date range:", error);
        return "Invalid date range";
    }
};

export const formatDateShortcut = (date: string | null | undefined): string => {
    if (!date) {
        return "Invalid date";
    }
    try {
        const daysOfWeek = ["SN", "M", "T", "W", "TH", "F", "ST"];
        const options: Intl.DateTimeFormatOptions = {
            weekday: "short",
            day: "2-digit",
        };
        const formattedDate = new Date(date).toLocaleDateString(
            undefined,
            options,
        );
        const [, month] = formattedDate.split(" ");
        const dayIndex = new Date(date).getDay();
        const shortWeekday = daysOfWeek[dayIndex];
        return `${month}  ${shortWeekday}`;
    } catch (error) {
        console.error("Error formatting date shortcut:", error);
        return "Invalid date";
    }
};
