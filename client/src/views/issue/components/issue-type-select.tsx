import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Primitive} from "react-hook-form";
import {isArray} from "lodash";
import {t} from "i18next";

const issueTypes = [
    {
        name: 'common.story',
        value: 'story'
    },
    {
        name: 'common.bug',
        value: 'bug'
    },
    {
        name: 'common.task',
        value: 'task'
    },
    {
        name: 'common.epic',
        value: 'epic'
    }];

const IssueTypeSelect = ({
    defaultValue,
    onValueChange,
    placeholder = t('common.type')
}: {
    defaultValue?: Primitive | readonly string[];
    onValueChange: (value: string) => void;
    placeholder?: string;
}) => {

    if (isArray(defaultValue)){
        defaultValue = defaultValue[0];

        if (!defaultValue) {
            defaultValue = null
        }
    }

    return (
        <Select defaultValue={defaultValue as string} onValueChange={onValueChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {issueTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                            {t(type.name)}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default IssueTypeSelect;