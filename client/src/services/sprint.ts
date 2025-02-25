import {CreateSprintDto, DuplicateSprintDto, SprintDto, SprintViewDto, UpdateSprintDto} from "@minira/server";
import {serviceBuilder} from "@/lib/service.builder.ts";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export const {
    useGetAllEntries: useGetAllSprint,
    useGetEntryById: useGetSprintById,
    useDeleteEntry: useDeleteSprint,
    useCreateEntry: useCreateSprint,
    useUpdateEntry: useUpdateSprint,
} = serviceBuilder<SprintDto, CreateSprintDto, UpdateSprintDto, SprintViewDto>("sprint");

export const useDuplicateSprint = (
    onSuccess?: (data?: DuplicateSprintDto) => unknown | Promise<unknown>,
    onError?: (error: unknown) => unknown | Promise<unknown>,
) => {
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: DuplicateSprintDto }) => axios.post<DuplicateSprintDto, never>('/sprint/duplicate/' + id, data),
        onSuccess,
        onError
    });
};

