import {useForm} from "@/hooks/useForm";
import ValidationForm from "@/components/validation/validation-form.tsx";
import ValidationFormField from "@/components/validation/validation-form-field.tsx";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {t} from "i18next";
import * as z from "zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {zh} from "@/lib/zod.helper.ts";
import JobTitleSelect from "@/views/job-titles/components/job-title-select.tsx";

const MemberFormSchema = z.object({
    fullName: zh.min(2).max(255),
    jobTitleId: zh.id(),
});

const MemberEmptyForm = {
    fullName: "",
    jobTitleId: 0,
}

type MemberFormSchemaType = z.infer<typeof MemberFormSchema>;

const MemberForm = <T extends MemberFormSchemaType>({
    member,
    isPending,
    onSubmit,
    onClose,
}: {
    member: T,
    isPending: boolean,
    onSubmit: (data: T) => void
    onClose: () => void
}) => {

    const {
        form,
        onOpenChange,
        onSubmitHandler
    } = useForm<MemberFormSchemaType, T>(
        member,
        MemberFormSchema,
        MemberEmptyForm,
        onClose,
        onSubmit
    )

    return (
        <Dialog open={true} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update User</DialogTitle>
                </DialogHeader>
                <ValidationForm
                    form={form}
                    onSubmit={onSubmitHandler}
                    className="grid gap-1 py-1"
                >
                    <ValidationFormField
                        control={form.control}
                        name="fullName"
                        label={t('Name')}
                        render={({ field }) => (
                            <Input
                                id="name"
                                placeholder={t('Bob')}
                                className="col-span-3"
                                {...field}
                            />
                        )}
                    />

                    <ValidationFormField
                        control={form.control}
                        name="jobTitleId"
                        label={t('Job Title')}
                        render={({ field }) => (
                            <JobTitleSelect
                                onValueChange={field.onChange as (value: number) => void}
                                defaultValue={field.value}
                                {...field}
                            />
                        )}
                    />

                    <DialogFooter>
                        <Button disabled={isPending} type="submit">
                            {t('Save')}
                        </Button>
                    </DialogFooter>
                </ValidationForm>
            </DialogContent>
        </Dialog>
    );
};

export default MemberForm;
