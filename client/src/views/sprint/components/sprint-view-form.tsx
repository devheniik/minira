import { useForm } from "@/hooks/useForm";
import ValidationForm from "@/components/validation/validation-form.tsx";
import ValidationFormField from "@/components/validation/validation-form-field.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { t } from "i18next";
import { zh } from "@/lib/zod.helper";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { CreateLogDto } from "@minira/server";

const SprintViewFormSchema = z.object({
    remainingTime: zh.time(),
});

const SprintViewEmptyForm = {
    remainingTime: 0,
};

type SprintViewFormSchemaType = z.infer<typeof SprintViewFormSchema>;

const SprintViewForm = ({
    title = "Action",
    logData,
    isPending,
    onSubmit,
    onClose,
}: {
    title?: string;
    logData: CreateLogDto;
    isPending: boolean;
    onSubmit: (data: CreateLogDto) => void;
    onClose: () => void;
}) => {
    const { form, onOpenChange, onSubmitHandler } = useForm<
        SprintViewFormSchemaType,
        CreateLogDto
    >(logData, SprintViewFormSchema, SprintViewEmptyForm, onClose, (data) => {
        const remainingTime = +data.remainingTime;
        const spentTime = logData.remainingTime - remainingTime;
        onSubmit({
            remainingTime,
            spentTime,
            issueId: logData.issueId,
            logDate: logData.logDate,
        });
    });

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
                        name="remainingTime"
                        label={t("Remaining Time")}
                        render={({ field }) => (
                            <Input
                                type="number"
                                id="remainingTime"
                                placeholder={t("Enter remaining time")}
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

export default SprintViewForm;
