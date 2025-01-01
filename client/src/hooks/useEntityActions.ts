import {useState} from "react";
// @ts-expect-error - required for the type to be found
import type {UseQueryResult} from "@tanstack/react-query/src/types.ts";
import {DeleteEntryMutationType} from "@/lib/service.builder.ts";

interface UseEntityManagerProps<T> {
    useGetAll: () => UseQueryResult<T[]>;
    useDelete: DeleteEntryMutationType<T>;
}

interface UseSingleEntityActionsProps<T> {
    useGetById: (id: number) => UseQueryResult<T | null>;
    useDelete: DeleteEntryMutationType<T>;
    id: number;
}

export const useEntityManager = <T, U = T>() => {
    const [updatableEntity, setUpdatableEntity] = useState<U | null>(null);
    const [creatableEntity, setCreatableEntity] = useState<T | null>(null);

    const [isCreating, setIsCreating] = useState(false);

    const handleUpdate = (entity: U) => {
        setUpdatableEntity(entity);
    };

    const handleCreate = () => {
        setIsCreating(true);
    };

    const handleCreateWithEntity = (entity: T) => {
        setCreatableEntity(entity);
        setIsCreating(true);
    };

    const handleClose = () => {
        setUpdatableEntity(null);
        setCreatableEntity(null);
        setIsCreating(false);
    };

    return {
        updatableEntity,
        creatableEntity,
        isCreating,
        handleUpdate,
        handleCreate,
        handleCreateWithEntity,
        handleClose,
    };
};

export const useEntityActions = <T>({
    useGetAll,
    useDelete,
}: UseEntityManagerProps<T>) => {
    const { data, isFetching, refetch } = useGetAll();
    const { mutate: deleteEntity } = useDelete(refetch);

    const entityManager = useEntityManager<T>();

    const onSuccess = async () => {
        entityManager.handleClose();
        await refetch();
    };

    return {
        data,
        isPending: isFetching,
        deleteEntity,
        onSuccess,
        entityManager,
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
        };
    };
};

export const useSingleEntityActions = <T>({
    useGetById,
    useDelete,
    id,
}: UseSingleEntityActionsProps<T>) => {
    const {
        data: dataById,
        isFetching: isFetchingSingle,
        refetch,
    } = useGetById(id);

    const { mutate: deleteEntity } = useDelete(refetch);

    const entityManager = useEntityManager<T>();

    const onSuccess = async () => {
        entityManager.handleClose();
        await refetch();
    };

    return {
        dataById,
        isPending: isFetchingSingle,
        deleteEntity,
        onSuccess,
        entityManager,
    } as {
        dataById: T | null;
        isPending: boolean;
        deleteEntity: (id: number) => void;
        onSuccess: () => void;
        entityManager: {
            updatableEntity: T | null;
            creatableEntity: T | null;
            isCreating: boolean;
            handleUpdate: (entity: T) => void;
            handleCreate: () => void;
            handleCreateWithEntity: (entity: T) => void;
            handleClose: () => void;
        };
    };
};
