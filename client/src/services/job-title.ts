import {CreateJobTitleDto, JobTitleDto, UpdateJobTitleDto} from "@minira/server";
import {serviceBuilder} from "@/lib/service.builder.ts";

export const{
    useGetAllEntries: useGetAllJobTitles,
    useGetEntryById: useGetJobTitleById,
    useDeleteEntry: useDeleteJobTitle,
    useCreateEntry: useCreateJobTitle,
    useUpdateEntry: useUpdateJobTitle
} = serviceBuilder<JobTitleDto, CreateJobTitleDto, UpdateJobTitleDto>('job-title')

