import {useState} from "react";
// @ts-expect-error - required for the type to be found
import type {UseQueryResult} from "@tanstack/react-query/src/types.ts";
import {DeleteEntryMutationType} from "@/lib/service.builder.ts";

interface UseEntityManagerProps<T> {
    useGetAll: UseQueryResult<T[]>;
    useDelete: DeleteEntryMutationType<T>;
}

export const useEntityManager = <T>() => {
    const [updatableEntity, setUpdatableEntity] = useState<T | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleUpdate = (entity: T) => {
        setUpdatableEntity(entity);
    };

    const handleCreate = () => {
        setIsCreating(true);
    };

    const handleClose = () => {
        setUpdatableEntity(null);
        setIsCreating(false);
    };

    return {
        updatableEntity,
        isCreating,
        handleUpdate,
        handleCreate,
        handleClose,
    };
};

export const useEntityActions = <T>({
    useGetAll,
    useDelete,
}: UseEntityManagerProps<T>) => {
    const { data, isPending, refetch } = useGetAll();
    const { mutate: deleteEntity } = useDelete(refetch);

    const entityManager = useEntityManager<T>();

    const onSuccess = async () => {
        entityManager.handleClose();
        await refetch();
    };

    return {
        data,
        isPending,
        deleteEntity,
        onSuccess,
        entityManager
    } as {
        data: T[] | undefined;
        isPending: boolean;
        deleteEntity: (id: number) => void;
        onSuccess: () => void;
        entityManager: {
            updatableEntity: T | null;
            isCreating: boolean;
            handleUpdate: (entity: T) => void;
            handleCreate: () => void;
            handleClose: () => void;
        }
    }
};
