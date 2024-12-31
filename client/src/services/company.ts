import { CompanyDto, UpdateCompanyDto } from "@minira/server";
import { serviceBuilder } from "@/lib/service.builder.ts";

// Fix it
export const {
    useUpdateEntryWithParamId: useUpdateCompany,
    useGetCurrentEntry: useGetCurrentCompany,
} = serviceBuilder<CompanyDto, UpdateCompanyDto, UpdateCompanyDto>("profile");

console.log({
    useGetCurrentCompany,
    useUpdateCompany,
});
