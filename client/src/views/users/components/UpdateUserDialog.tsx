import useJobTitleMutations from "@/hooks/useJobTitleMutations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationForm from "@/components/validation/validation-form.tsx";
import ValidationFormField from "@/components/validation/validation-form-field.tsx";
import { useState } from "react";
import { renderErrorStatusCode } from "@/lib/errorFormatter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import createUserFormSchema from "./utils/constant";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

type UpdateUserFormSchemaType = z.infer<typeof createUserFormSchema>;

const UpdateUserDialog = ({ id }: { id: number }) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const {
        mutate: updateUser,
        isError,
        isPending,
        error,
        getJobTitleById,
    } = useJobTitleMutations();
    const user = getJobTitleById(id);

    const form = useForm<UpdateUserFormSchemaType>({
        resolver: zodResolver(createUserFormSchema),
        defaultValues: {
            name: user?.name,
            description: user?.description,
        },
    });

    const onSubmit = (data: UpdateUserFormSchemaType) => {
        updateUser(
            { action: "update", jobTitle: { id, ...data } },
            {
                onSuccess: () => {
                    setIsDialogOpen(false);
                },
            },
        );
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
                <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update User</DialogTitle>
                </DialogHeader>
                {isError && (
                    <p className="text-red-500">
                        {renderErrorStatusCode(error.status)}
                    </p>
                )}
                <ValidationForm
                    form={form}
                    onSubmit={onSubmit}
                    className="grid gap-1 py-1"
                >
                    <ValidationFormField
                        control={form.control}
                        name="name"
                        label="Name"
                        render={({ field }) => (
                            <Input
                                id="name"
                                placeholder="Pedro Duarte"
                                className="col-span-3"
                                {...field}
                            />
                        )}
                    />
                    <ValidationFormField
                        control={form.control}
                        name="description"
                        label="Description"
                        render={({ field }) => (
                            <Input
                                id="description"
                                placeholder="Backend Developer"
                                className="col-span-3"
                                {...field}
                            />
                        )}
                    />

                    <DialogFooter>
                        <Button disabled={isPending} type="submit">
                            Update
                        </Button>
                    </DialogFooter>
                </ValidationForm>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateUserDialog;
