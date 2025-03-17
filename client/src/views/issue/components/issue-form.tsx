import {useForm} from "@/hooks/useForm";
import ValidationForm from "@/components/validation/validation-form.tsx";
import ValidationFormField from "@/components/validation/validation-form-field.tsx";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {t} from "i18next";
import * as z from "zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {zh} from "@/lib/zod.helper.ts";
import MemberSelect from "@/views/members/components/member-select.tsx";
import IssueTypeSelect from "@/views/issue/components/issue-type-select.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import IssueSelect from "@/views/issue/components/issue-select.tsx";
import {useEffect} from "react";

const interpolateType = (type: string) => {
    if (type == 'epic') {
        return 'none';
    }

    if (type == 'story') {
        return 'epic';
    }

    return 'story';
}

const IssueFormSchema = z.object({
    name: zh.string().min(2).max(255),
    description: zh.string().optional(),
    originalEstimate: zh.min(0),
    memberId: zh.id(),
    parentIssueId: zh.id({
        optional: true,
    }).optional(),
    type: zh.string(),
});

const IssueEmptyForm = {
    name: "",
    description: "",
    originalEstimate: 0,
    memberId: 0,
    parentIssueId: 0,
    type: "task",
};

type IssueFormSchemaType = z.infer<typeof IssueFormSchema>;

const IssueForm = <T extends IssueFormSchemaType>({
    title = "Action",
    issue,
    isPending,
    onSubmit,
    onClose,
    extraButtons = [],
}: {
    title?: string;
    issue: T;
    isPending: boolean;
    onSubmit: (data: T) => void;
    onClose: () => void;
    extraButtons?: Array<{
        text: string;
        onClick: () => void;
        variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
        disabled?: boolean;
    } | null>;
}) => {
    const { form, onOpenChange, onSubmitHandler } = useForm<
        IssueFormSchemaType,
        T
    >(issue, IssueFormSchema, IssueEmptyForm, onClose, onSubmit);


    useEffect(() => {
        const { unsubscribe } = form.watch((_value, { name }) => {
            if (name == 'type') {
                form.setValue('parentIssueId', undefined);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [form]);

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
                        label={t("common.name")}
                        render={({ field }) => (
                            <Input
                                id="name"
                                placeholder={t("issue.placeholder")}
                                className="col-span-3"
                                {...field}
                            />
                        )}
                    />

                    <ValidationFormField
                        control={form.control}
                        name="originalEstimate"
                        label={t("common.estimate")}
                        render={({ field }) => (
                            <Input
                                id="name"
                                type={'number'}
                                placeholder={t("common.estimate")}
                                className="col-span-3"
                                {...field}
                            />
                        )}
                    />

                    <ValidationFormField
                        control={form.control}
                        name="memberId"
                        label={t("member.placeholder")}
                        render={({ field }) => (
                            <MemberSelect
                                onValueChange={
                                    field.onChange as (value: number) => void
                                }
                                defaultValue={field.value}
                                {...field}
                            />
                        )}
                    />

                    <ValidationFormField
                        control={form.control}
                        name="type"
                        label={t("common.type")}
                        render={({ field }) => (
                            <IssueTypeSelect
                                onValueChange={
                                    field.onChange as (value: string) => void
                                }
                                defaultValue={field.value}
                                {...field}
                            />
                        )}
                    />

                    <ValidationFormField
                        control={form.control}
                        name="parentIssueId"
                        label={t("issue.parentIssue")}
                        render={({ field }) => (
                            <IssueSelect
                                onValueChange={
                                    field.onChange as (value: number) => void
                                }
                                defaultValue={field.value}
                                type={interpolateType(form.getValues('type') as string)}
                                {...field}
                            />
                        )}
                    />


                    <ValidationFormField
                        control={form.control}
                        name="description"
                        label={t("common.description")}
                        render={({ field }) => (
                            // @ts-expect-error - required for the type to be found
                            <Textarea
                                id="description"
                                placeholder={t("common.description")}
                                className="col-span-3"
                                {...field}
                            />
                        )}
                    />


                    <DialogFooter>
                        <div className="flex flex-fow justify-between w-full">
                            <div className={'flex flex-row space-x-2'}>
                                {extraButtons.map((button, index) => button && (
                                    <Button
                                        key={index}
                                        onClick={button.onClick}
                                        type="button"
                                        variant={button.variant || 'default'}
                                        disabled={button.disabled || isPending}
                                    >
                                        {button.text}
                                    </Button>
                                ))}
                            </div>


                            <Button disabled={isPending} type="submit">
                                {t("common.actions.save")}
                            </Button>
                        </div>
                    </DialogFooter>
                </ValidationForm>
            </DialogContent>
        </Dialog>
    );
};

export default IssueForm;
