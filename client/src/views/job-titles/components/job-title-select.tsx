import AsyncSelect from "@/components/forms/async-select.tsx";
import {useGetAllJobTitles} from "@/services/job-title.ts";
import {t} from "i18next";
import {Primitive} from "react-hook-form";
import {isArray} from "lodash";

export const JobTitleSelect = (
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
        <AsyncSelect query={useGetAllJobTitles} placeholder={t('Developer')} onValueChange={onValueChange} defaultValue={defaultValue as Primitive} />
    )

};

export default JobTitleSelect;