import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
// @ts-expect-error - required for the type to be found
import type {UseQueryResult} from "@tanstack/react-query/src/types";
import type {Primitive} from "react-hook-form";

export const AsyncSelect = <
    T extends { id: number } & Record<K, string>,
    K extends keyof Omit<T, 'id'>
>(
        {
            query,
            placeholder,
            titleKey = 'name' as K ,
            onValueChange,
            defaultValue
        }: {
        query: UseQueryResult<T[]>;
        placeholder: string;
        titleKey?: K;
        onValueChange: (value: number) => void;
        defaultValue?: Primitive;

}) => {
    const { data: options = [], isLoading } = query<T>();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleValueChange = (value: string) => {
        const id = Number(value);

        if (id) {
            onValueChange(id);
        }
    }

    return (
        <Select defaultValue={String(defaultValue)} onValueChange={handleValueChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options?.length && options.map((item: T) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                            {item[titleKey]}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default AsyncSelect;
