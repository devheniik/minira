import { CreateIssueDto, IssueDto, UpdateIssueDto } from "@minira/server";
import { serviceBuilder } from "@/lib/service.builder.ts";

export const {
    useGetAllEntries: useGetAllIssues,
    useGetEntryById: useGetIssueById,
    useDeleteEntry: useDeleteIssue,
    useCreateEntry: useCreateIssue,
} = serviceBuilder<IssueDto, CreateIssueDto, UpdateIssueDto>("issue");

console.log({
    useGetAllIssues,
    useGetIssueById,
    useDeleteIssue,
    useCreateIssue,
});
