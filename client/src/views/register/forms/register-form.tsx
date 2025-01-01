import {Link, useNavigate} from "react-router";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useTranslation} from "react-i18next";
import ValidationFormField from "@/components/validation/validation-form-field.tsx";
import ValidationForm from "@/components/validation/validation-form.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {zh} from "@/lib/zod.helper.ts";
import * as z from "zod";
import {useMutation} from "@tanstack/react-query";
import {useAuth} from "@/hooks/useAuth.ts";

const registerFormSchema = z
    .object({
        email: zh.string().min(1).max(255),
        password: zh.string().min(6).max(9999),
        confirmPassword: zh.string().min(6).max(9999),
        fullName: zh.string().min(1).max(255),
        companyName: zh.string().min(1).max(255),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
    const { t } = useTranslation();
    const [error, setError] = useState<boolean>(false);

    const form = useForm<RegisterFormSchemaType>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            fullName: "",
            companyName: "",
        },
    });

    const { onRegister } = useAuth()
    const navigate = useNavigate();

    const { mutate: onSubmit, isPending } = useMutation({
        mutationFn: async (values: RegisterFormSchemaType) => {
            if (onRegister) {
                try {
                    await onRegister(
                        values.email,
                        values.password,
                        values.fullName,
                        values.companyName,
                    );
                    navigate("/");
                } catch (error) {
                    setError(true);
                }
            }
        },
    });

    return (
        <Card className="w-[440px] border-none shadow-none">
            <CardHeader>
                <CardTitle className="text-4xl text-center">
                    {t("authForm.headers.registration")}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ValidationForm
                    form={form}
                    onSubmit={onSubmit}
                    className="space-y-5"
                >
                    <ValidationFormField
                        control={form.control}
                        name="fullName"
                        label={t("authForm.labels.fullName")}
                        render={({ field }) => (
                            <Input
                                type="text"
                                placeholder={t(
                                    "authForm.placeholders.fullName",
                                )}
                                {...field}
                            />
                        )}
                    />

                    <ValidationFormField
                        control={form.control}
                        name="email"
                        label={t("authForm.labels.email")}
                        render={({ field }) => (
                            <Input
                                type="email"
                                placeholder={t("authForm.placeholders.email")}
                                {...field}
                            />
                        )}
                    />

                    <ValidationFormField
                        control={form.control}
                        name="password"
                        label={t("authForm.labels.password")}
                        render={({ field }) => (
                            <Input
                                type="password"
                                placeholder={t(
                                    "authForm.placeholders.password",
                                )}
                                {...field}
                            />
                        )}
                    />

                    <ValidationFormField
                        control={form.control}
                        name="confirmPassword"
                        label={t("authForm.labels.confirmPassword")}
                        render={({ field }) => (
                            <Input
                                type="password"
                                placeholder={t(
                                    "authForm.placeholders.confirmPassword",
                                )}
                                {...field}
                            />
                        )}
                    />

                    <ValidationFormField
                        control={form.control}
                        name="companyName"
                        label={t("authForm.labels.companyName")}
                        render={({ field }) => (
                            <Input
                                type="text"
                                placeholder={t(
                                    "authForm.placeholders.companyName",
                                )}
                                {...field}
                            />
                        )}
                    />
                    {error && (
                        <div className="text-red-500 text-center">
                            {t("authForm.errors.login")}
                        </div>
                    )}
                    <div className="w-full flex items-center justify-center">
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            {t("authForm.buttons.submit")}
                        </Button>
                    </div>
                </ValidationForm>
                <div className="flex justify-center flex-col items-center gap-1 mt-6 text-sm">
                    <span>{t("authForm.additionally.haveAccount")}</span>
                    <Link to="/login" className="underline">
                        {t("authForm.headers.login")}
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
