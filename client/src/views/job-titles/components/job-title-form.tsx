import {useForm} from "@/hooks/useForm";
import ValidationForm from "@/components/validation/validation-form.tsx";
import ValidationFormField from "@/components/validation/validation-form-field.tsx";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {t} from "i18next";
import * as z from "zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {zh} from "@/lib/zod.helper.ts";

const JobTitleFormSchema = z.object({
    name: zh.string().min(2).max(255),
    description: z.string().optional(),
});

const JobTitleEmptyForm = {
    name: "",
    description: "",
};

type JobTitleFormSchemaType = z.infer<typeof JobTitleFormSchema>;

const JobTitleForm = <T extends JobTitleFormSchemaType>({
    title = "Action",
    jobTitle,
    isPending,
    onSubmit,
    onClose,
}: {
    title?: string;
    jobTitle: T;
    isPending: boolean;
    onSubmit: (data: T) => void;
    onClose: () => void;
}) => {
    const { form, onOpenChange, onSubmitHandler } = useForm<
        JobTitleFormSchemaType,
        T
    >(jobTitle, JobTitleFormSchema, JobTitleEmptyForm, onClose, onSubmit);

    return (
        <Dialog open={true} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <ValidationForm
                    form={form}
                    onSubmit={onSubmitHandler}
                    className="grid gap-1 py-1"
                >
                    <ValidationFormField
                        control={form.control}
                        name="name"
                        label={t("Name")}
                        render={({ field }) => (
                            <Input
                                id="name"
                                placeholder={t("Manager")}
                                className="col-span-3"
                                {...field}
                            />
                        )}
                    />

                    <ValidationFormField
                        control={form.control}
                        name="description"
                        label={t("Description")}
                        render={({ field }) => (
                            <Input
                                id="description"
                                placeholder={t("Enter description")}
                                className="col-span-3"
                                {...field}
                            />
                        )}
                    />

                    <DialogFooter>
                        <Button disabled={isPending} type="submit">
                            {t("Save")}
                        </Button>
                    </DialogFooter>
                </ValidationForm>
            </DialogContent>
        </Dialog>
    );
};

export default JobTitleForm;
