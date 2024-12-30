import axios from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";
// @ts-expect-error - required for the type to be found
import type {UseMutationResult} from "@tanstack/react-query/src/types.ts";

export function requestsBuilder<T, C, U, V = T>(url: string) {

    const getAllEntries = async (): Promise<T[]> => {
        const { data } = await axios.get<T[]>(url);
        return data;
    }

    const getEntryById = async (id: number): Promise<V> => {
        const { data } = await axios.get<V>(`${url}/${id}`);
        return data;
    }

    const deleteEntry = async (id: number): Promise<T> => {
        const { data } = await axios.delete<T>(`${url}/${id}`);
        return data;
    }

    const createEntry = async (entry: C): Promise<T> => {
        const { data } = await axios.post<T>(url, entry);
        return data;
    }

    const updateEntry = async (id: number, entry: U): Promise<T> => {
        const { data } = await axios.patch<T>(`${url}/${id}`, entry);
        return data;
    }

    return {
        getAllEntries,
        getEntryById,
        deleteEntry,
        createEntry,
        updateEntry
    }
}

export function serviceBuilder<T, C, U, V = T>(url: string) {

    const queryRequests = requestsBuilder<T, C, U, V>(url);

    const useGetAllEntries = () => {
        return useQuery<T[]>({
            queryKey: [url],
            queryFn: queryRequests.getAllEntries
        });
    };

    const useGetEntryById = (id: number) => {
        return useQuery<V>({
            queryKey: [url, id],
            queryFn: () => queryRequests.getEntryById(id)
        });
    };

    const useDeleteEntry: DeleteEntryMutationType<T> = (
        onSuccess?: (data?: T) => unknown | Promise<unknown>,
        onError?: (error: unknown) => unknown | Promise<unknown>,
    ) => {
        return useMutation({
            mutationFn: (id: number) => queryRequests.deleteEntry(id),
            onSuccess,
            onError
        });
    };

    const useCreateEntry = (
        onSuccess?: (data?: T) => unknown | Promise<unknown>,
        onError?: (error: unknown) => unknown | Promise<unknown>,
    ) => {
        return useMutation({
            mutationFn: queryRequests.createEntry,
            onSuccess,
            onError
        });
    };

    const useUpdateEntry = (
        id: number,
        onSuccess?: (data?: T) => unknown | Promise<unknown>,
        onError?: (error: unknown) => unknown | Promise<unknown>,
    ) => {
        return useMutation({
            mutationFn: async ( entry: U ) => await queryRequests.updateEntry(id, entry),
            onSuccess,
            onError
        });
    };

    return {
        useGetAllEntries,
        useGetEntryById,
        useDeleteEntry,
        useCreateEntry,
        useUpdateEntry
    };
}

// const useDeleteEntry = (
//     onSuccess?: (data?: T) => unknown | Promise<unknown>,
//     onError?: (error: unknown) => unknown | Promise<unknown>,
// ) => {
//     return useMutation({
//         mutationFn: (id: number) => queryRequests.deleteEntry(id),
//         onSuccess,
//         onError
//     });
// };

export type DeleteEntryMutationType<T> = (
    onSuccess?: (data?: T) => unknown | Promise<unknown>,
    onError?: (error: unknown) => unknown | Promise<unknown>,
) => UseMutationResult<T>