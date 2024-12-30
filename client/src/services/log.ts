import { CreateLogDto } from "@minira/server";
import { serviceBuilder } from "@/lib/service.builder.ts";

export const {
    useGetAllEntries: useGetAllLogs,
    useGetEntryById: useGetLogById,
    useDeleteEntry: useDeleteLog,
    useCreateEntry: useCreateLog,
    // Fix it
} = serviceBuilder<CreateLogDto, CreateLogDto, CreateLogDto>("log");

console.log({
    useGetAllLogs,
    useGetLogById,
    useDeleteLog,
    useCreateLog,
});
