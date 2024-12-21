import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Types
export interface JobTitle {
    id: number;
    companyId: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface NewJobTitle {
    name: string;
    description: string;
}

export interface UpdateJobTitle {
    id: number;
    name: string;
    description: string;
}

interface OptimisticJobTitle extends JobTitle {
    isOptimistic?: boolean;
}

type MutationData =
    | { action: "delete"; id: number }
    | { action: "add"; jobTitle: NewJobTitle }
    | { action: "update"; jobTitle: UpdateJobTitle };

type MutationParams = MutationData;

function useJobTitleMutations() {
    const queryClient = useQueryClient();
    const apiUrl = import.meta.env.VITE_API_URL;

    const mutationFn = async (
        params: MutationParams,
    ): Promise<JobTitle | void> => {
        switch (params.action) {
            case "delete":
                await axios.delete(`${apiUrl}job-title/${params.id}`);
                return;
            case "add":
                // eslint-disable-next-line no-case-declarations
                const addRes = await axios.post<JobTitle>(
                    `${apiUrl}job-title`,
                    params.jobTitle,
                );
                return addRes.data;
            case "update":
                // eslint-disable-next-line no-case-declarations
                const updateRes = await axios.patch<JobTitle>(
                    `${apiUrl}job-title/${params.jobTitle.id}`,
                    {
                        name: params.jobTitle.name,
                        description: params.jobTitle.description,
                    },
                );
                return updateRes.data;
            default:
                throw new Error("Invalid action");
        }
    };

    const getJobTitleById = (id: number): JobTitle | undefined => {
        const jobTitles = queryClient.getQueryData<JobTitle[]>(["jobTitles"]);
        return jobTitles?.find((job) => job.id === id);
    };

    const mutation = useMutation<
        JobTitle | void,
        { message: string; status?: number },
        MutationParams,
        { previousJobTitles?: JobTitle[] }
    >({
        mutationFn,

        onMutate: async (params) => {
            await queryClient.cancelQueries({ queryKey: ["jobTitles"] });

            const previousJobTitles = queryClient.getQueryData<JobTitle[]>([
                "jobTitles",
            ]);

            queryClient.setQueryData<JobTitle[]>(["jobTitles"], (old = []) => {
                switch (params.action) {
                    case "delete":
                        return old.filter((job) => job.id !== params.id);
                    case "add":
                        return [
                            ...old,
                            {
                                id: Date.now(),
                                companyId: 1,
                                name: params.jobTitle.name,
                                description: params.jobTitle.description,
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                                isOptimistic: true,
                            } as OptimisticJobTitle,
                        ];
                    case "update":
                        return old.map((job) =>
                            job.id === params.jobTitle.id
                                ? {
                                      ...job,
                                      name: params.jobTitle.name,
                                      description: params.jobTitle.description,
                                      isOptimistic: true,
                                  }
                                : job,
                        );
                    default:
                        return old;
                }
            });

            return { previousJobTitles };
        },

        onError: (err, variables, context) => {
            console.error("Error performing job title mutation:", err);
            if (context?.previousJobTitles) {
                queryClient.setQueryData(
                    ["jobTitles"],
                    context.previousJobTitles,
                );
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["jobTitles"] });
        },
    });

    return {
        ...mutation,
        getJobTitleById,
    };
}

export default useJobTitleMutations;
