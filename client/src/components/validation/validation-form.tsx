import React from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
// @ts-expect-error - required for the type to be found
import {FieldValues} from 'react-hook-form/dist/types/fields'

type ValidationFormProps<TFieldValues extends FieldValues = FieldValues> = {
    form: UseFormReturn<TFieldValues>;
    onSubmit: (values: TFieldValues) => void;
    children: React.ReactNode;
    className?: string;
};

const ValidationForm = <TFieldValues extends FieldValues = FieldValues>({
    form,
    onSubmit,
    className,
    children,
}: ValidationFormProps<TFieldValues>) => {
    return (
        <FormProvider {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)} className={className}>
                {children}
            </form>
        </FormProvider>
    )
}

export default ValidationForm
