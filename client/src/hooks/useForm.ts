import {zodResolver} from "@hookform/resolvers/zod";
import {ZodObject} from "zod";
import {useForm as useReactHookForm} from "react-hook-form";
// @ts-expect-error - required for the type to be found
import type {FieldValues} from "react-hook-form/dist/types";
// @ts-expect-error - required for the type to be found
import {ZodRawShape} from "zod/lib/types";


export function useForm<FormSchema extends FieldValues, U extends FormSchema>(
    original: FormSchema,
    schema: ZodObject<ZodRawShape>,
    emptyForm: FormSchema,
    onClose: () => void,
    onSubmit: (data: U) => void
) {
    const form = useReactHookForm<FormSchema>({
        resolver: zodResolver(schema),
        defaultValues: original ?? emptyForm
    });

    const onOpenChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    const onSubmitHandler = (data: FormSchema) => {
        onSubmit(data as U);
    }

    return {
        form,
        onOpenChange,
        onSubmitHandler
    }
}