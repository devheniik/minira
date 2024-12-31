import AsyncSelect from "@/components/forms/async-select.tsx";
import {useGetAllMembers} from "@/services/member.ts";
import {t} from "i18next";
import {Primitive} from "react-hook-form";
import {isArray} from "lodash";

export const MemberSelect = (
    {
        defaultValue,
        onValueChange,
    }: {
        defaultValue?: Primitive | readonly string[]
        onValueChange: (value: number) => void;
    }
) => {

    if (isArray(defaultValue)){
        defaultValue = defaultValue[0];

        if (!defaultValue) {
            defaultValue = null
        }
    }

    return (
        <AsyncSelect titleKey={'fullName' as never} query={useGetAllMembers} placeholder={t('member.placeholder')} onValueChange={onValueChange} defaultValue={defaultValue as Primitive} />
    )

};

export default MemberSelect;