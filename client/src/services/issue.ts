import {CreateIssueDto, IssueDto, UpdateIssueDto} from "@minira/server";
import {serviceBuilder} from "@/lib/service.builder.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useState} from "react";

export const {
    useGetAllEntries: useGetAllIssues,
    useGetEntryById: useGetIssueById,
    useDeleteEntry: useDeleteIssue,
    useUpdateEntry: useUpdateIssue,
    useCreateEntry: useCreateIssue,
} = serviceBuilder<IssueDto, CreateIssueDto, UpdateIssueDto>("issue");

export const selectIssues = async (type: string = '', name: string = '') => {
    const { data } = await axios.get<IssueDto[]>(`issue?name=${name}&type=${type}`)
    return data
}

export function useSelectIssues(type: string) {
    const [name, setName] = useState('');

    const issueQuery =  useQuery<IssueDto[]>({
        initialData: [],
        queryKey: ['issue', type, name],
        queryFn: async () => {
            const { data } = await axios.get<IssueDto[]>(`issue?name=${name}&type=${type}`)
            return data;
        }
    })

    return {
        issueQuery,
        name,
        setName
    }
}

export const useUnbindIssueFromSprint = (
    sprintId: number,
    onSuccess?: () => unknown | Promise<unknown>,
    onError?: (error: unknown) => unknown | Promise<unknown>,
) => {
    return useMutation({
        mutationFn: (issueIds: number[]) =>
            axios.patch(`/sprint/detach-issues-to-sprint/${sprintId}`, { issueIds }),
        onSuccess,
        onError
    });
};

export const useDuplicateIssue = () => {
    return (issue: IssueTableDto): CreateIssueDto => {
        return {
            name: issue.name,
            memberId: issue.memberId,
            originalEstimate: issue.originalEstimate,
            description: "",
            parentIssueId: undefined as never,
            sprintId: 0,
            type: "task",
        };
    };
};
