import { useForm } from "react-hook-form";
import ValidationForm from "@/components/validation/validation-form.tsx";
import ValidationFormField from "@/components/validation/validation-form-field.tsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { t } from "i18next";
import * as z from "zod";
import { zh } from "@/lib/zod.helper.ts";
import { useUpdateCompany } from "@/services/company";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanyDto } from "@minira/server";

const CompanyFormSchema = z.object({
    name: zh.string().min(1, { message: "Name is required" }),
});

type CompanyFormSchemaType = z.infer<typeof CompanyFormSchema>;

const CompanyForm = ({ company }: { company: CompanyDto }) => {
    const { mutate: updateCompany, isPending } = useUpdateCompany(company.id);

    const form = useForm<CompanyFormSchemaType>({
        resolver: zodResolver(CompanyFormSchema),
        defaultValues: { name: company.name },
    });

    return (
        <div>
            <ValidationForm
                form={form}
                onSubmit={updateCompany}
                className="w-[440px] grid gap-1 py-1"
            >
                <ValidationFormField
                    control={form.control}
                    name="name"
                    label={t("Company name")}
                    render={({ field }) => (
                        <Input
                            id="name"
                            placeholder={t("Enter setting name")}
                            className="col-span-3"
                            {...field}
                        />
                    )}
                />

                <div className="text-left ">
                    <Button disabled={isPending} type="submit">
                        {t("Save Changes")}
                    </Button>
                </div>
            </ValidationForm>
        </div>
    );
};

export default CompanyForm;
