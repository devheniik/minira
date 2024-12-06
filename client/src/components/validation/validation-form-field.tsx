import React from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form.tsx'
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'

type AdditionalProps = {
    label: string;
    render: (props: { field: React.ComponentProps<'input'> }) => React.ReactNode; // Type for the render function
};

const ValidationFormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
        control,
        name,
        label,
        render,
    }: ControllerProps<TFieldValues, TName> & AdditionalProps) => {
    return (
        <FormField control={control} name={name} render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>

                <FormControl>
                    {render({ field })}
                </FormControl>

                <FormDescription />
                <FormMessage />
            </FormItem>
        )} />
    )
}

export default ValidationFormField
