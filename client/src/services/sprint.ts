import {CreateSprintDto, SprintDto, SprintViewDto, UpdateSprintDto} from "@minira/server";
import {serviceBuilder} from "@/lib/service.builder.ts";

export const {
    useGetAllEntries: useGetAllSprint,
    useGetEntryById: useGetSprintById,
    useDeleteEntry: useDeleteSprint,
    useCreateEntry: useCreateSprint,
    useUpdateEntry: useUpdateSprint,
} = serviceBuilder<SprintDto, CreateSprintDto, UpdateSprintDto, SprintViewDto>("sprint");
