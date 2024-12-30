import {useForm} from "@/hooks/useForm";
import ValidationForm from "@/components/validation/validation-form.tsx";
import ValidationFormField from "@/components/validation/validation-form-field.tsx";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {t} from "i18next";
import {zh} from "@/lib/zod.helper";
import {useEffect} from "react";
import * as z from "zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";

const SprintFormSchema = z.object({
    name: zh.min(2).max(255),
    description: z.string().optional(),
    startDate: zh.date(),
    endDate: zh.date(),
});

const SprintEmptyForm = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
};

type SprintFormSchemaType = z.infer<typeof SprintFormSchema>;

const SprintForm = <T extends SprintFormSchemaType>({
    title = "Action",
    sprint,
    isPending,
    onSubmit,
    onClose,
}: {
    title?: string;
    sprint: T;
    isPending: boolean;
    onSubmit: (data: T) => void;
    onClose: () => void;
}) => {
    const { form, onOpenChange, onSubmitHandler } = useForm<
        SprintFormSchemaType,
        T
    >(sprint, SprintFormSchema, SprintEmptyForm, onClose, (data) => {
        const formattedData = {
            ...data,
            startDate: new Date(data.startDate).toISOString(),
            endDate: new Date(data.endDate).toISOString(),
        };
        onSubmit(formattedData);
    });

    useEffect(() => {
        if (sprint.startDate) {
            form.setValue(
                "startDate",
                new Date(sprint.startDate).toISOString().split("T")[0],
            );
        }
        if (sprint.endDate) {
            form.setValue(
                "endDate",
                new Date(sprint.endDate).toISOString().split("T")[0],
            );
        }
    }, [sprint, form]);

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
                                placeholder={t("Bob")}
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
                                placeholder={t("Bob")}
                                className="col-span-3"
                                {...field}
                            />
                        )}
                    />
                    <ValidationFormField
                        control={form.control}
                        name="startDate"
                        label={t("Start Date")}
                        render={({ field }) => (
                            <Input
                                type="date"
                                id="startDate"
                                placeholder={t("Start Date")}
                                className="col-span-3"
                                {...field}
                            />
                        )}
                    />

                    <ValidationFormField
                        control={form.control}
                        name="endDate"
                        label={t("End Date")}
                        render={({ field }) => (
                            <Input
                                type="date"
                                id="endDate"
                                placeholder={t("End Date")}
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

export default SprintForm;
