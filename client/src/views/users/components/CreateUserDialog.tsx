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

type CreateUserFormSchemaType = z.infer<typeof createUserFormSchema>;

const CreateUserDialog = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const {
        mutate: createUser,
        isPending,
        isError,
        error,
    } = useJobTitleMutations();

    const form = useForm<CreateUserFormSchemaType>({
        resolver: zodResolver(createUserFormSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onSubmit = (data: CreateUserFormSchemaType) => {
        createUser(
            { action: "add", jobTitle: data },
            {
                onSuccess: () => {
                    form.reset();
                    setIsDialogOpen(false);
                },
                onError: () => {
                    console.log(error);
                },
            },
        );
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>
                    Create New
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
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
                            Create
                        </Button>
                    </DialogFooter>
                </ValidationForm>
            </DialogContent>
        </Dialog>
    );
};

export default CreateUserDialog;
