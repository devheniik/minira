import dayjs from "dayjs";

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

export const formatDateRange = (
    startDate: string,
    endDate: string,
): string => {
    const start = dayjs(startDate).format('DD/MM/YYYY');
    const end = dayjs(endDate).format('DD/MM/YYYY');

    return `${start} - ${end}`;
};

export const formatDateShortcut = (date: string): string => {
    const day = dayjs(date);
    const formattedDay = day.format('dd'); // Short day name (e.g., M, Tu, W)
    const formattedDate = day.format('D'); // Day of the month
    return `${formattedDay} ${formattedDate}`;
};
