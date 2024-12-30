import {useForm} from "@/hooks/useForm.ts";
import ValidationForm from "@/components/validation/validation-form.tsx";
import ValidationFormField from "@/components/validation/validation-form-field.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {t} from "i18next";
import {zh} from "@/lib/zod.helper.ts";
import * as z from "zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog.tsx";
import {CreateLogDto} from "@minira/server";
import {useEffect} from "react";

const TimeLogFormSchema = z.object({
    issueId: zh.id(),
    remainingTime: zh.hours(),
    spentTime: zh.hours(),
    logDate: zh.date(),
});

const TimeLogEmptyForm = {
    issueId: 0,
    remainingTime: 0,
    spentTime: 0,
    logDate: '',
};

type TimeLogFormSchemaType = z.infer<typeof TimeLogFormSchema>;

const CreateTimeLogForm = ({
    logData,
    isPending,
    onSubmit,
    onClose,
}: {
    logData: CreateLogDto;
    isPending: boolean;
    onSubmit: (data: CreateLogDto) => void;
    onClose: () => void;
}) => {

    logData.spentTime = logData.remainingTime - +logData.remainingTime

    const { form, onOpenChange, onSubmitHandler } = useForm<
        TimeLogFormSchemaType,
        CreateLogDto
    >(logData, TimeLogFormSchema, TimeLogEmptyForm, onClose, (data) => {
        onSubmit(data)
    });

    useEffect(() => {
        const { unsubscribe } = form.watch((value, { name }) => {
            if (name == 'remainingTime') {
                const newSpentTime = logData.remainingTime - +(value.remainingTime ?? 0)

                form.setValue('spentTime', newSpentTime > 0 ? newSpentTime : 0)
            }
        })

        return () => unsubscribe()
    }, [form, logData.remainingTime])
    return (
        <Dialog open={true} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('common.track')}</DialogTitle>
                </DialogHeader>
                <ValidationForm
                    form={form}
                    onSubmit={onSubmitHandler}
                    className="grid gap-1 py-1"
                >

                    <ValidationFormField
                        control={form.control}
                        name="remainingTime"
                        label={t("common.remainingTime")}
                        render={({ field }) => (
                            <Input
                                type="number"
                                id="remainingTime"
                                placeholder={t("common.remainingTime")}
                                className="col-span-3"
                                {...field}
                            />
                        )}
                    />

                    <ValidationFormField
                        control={form.control}
                        name="spentTime"
                        label={t("common.spentTime")}
                        render={({ field }) => (
                            <Input
                                type="number"
                                id="spentTime"
                                placeholder={t("common.spentTime")}
                                className="col-span-3"
                                {...field}
                            />
                        )}
                    />

                    <DialogFooter>
                        <Button disabled={isPending} type="submit">
                            {t("common.actions.save")}
                        </Button>
                    </DialogFooter>
                </ValidationForm>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTimeLogForm;
