import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button.tsx";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useTranslation } from "react-i18next";
import ValidationFormField from "@/components/validation/validation-form-field.tsx";
import ValidationForm from "@/components/validation/validation-form.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { zh } from "@/lib/zod.helper.ts";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const loginFormSchema = z.object({
    email: zh.min(1).max(255),
    password: zh.min(1).max(9999),
});

type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

export function LoginForm() {
    const [error, setError] = useState<boolean>(false);
    const { t } = useTranslation();

    const form = useForm<LoginFormSchemaType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { onLogin } = useAuth();
    const navigate = useNavigate();

    const { mutate: onSubmit, isPending } = useMutation({
        mutationFn: async (values: LoginFormSchemaType) => {
            if (onLogin) {
                try {
                    await onLogin(values.email, values.password);
                    navigate("/");
                } catch (error) {
                    setError(true);
                }
            }
        },
    });

    return (
        <Card className=" w-[440px] border-none shadow-none">
            <CardHeader>
                <CardTitle className="text-4xl text-center">
                    {t("authForm.headers.login")}
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
                    <span>{t("authForm.additionally.haveNotAccount")}</span>
                    <Link to="/register" className="underline">
                        {t("authForm.headers.registration")}
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
