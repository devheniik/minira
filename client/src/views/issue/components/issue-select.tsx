import {useSelectIssues} from "@/services/issue.ts";
import {t} from "i18next";

import * as React from "react";
import {useEffect} from "react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import {isArray} from "lodash";
import {Primitive} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";

const IssueSelect = ({
    defaultValue,
    defaultValueLabel,
    onValueChange,
    type = "",
}: {
    defaultValue?: Primitive | readonly string[];
    defaultValueLabel?: string
    onValueChange: (value: number) => void;
    type?: string;
}) => {

    if (isArray(defaultValue)){
        defaultValue = defaultValue[0];

        if (!defaultValue) {
            defaultValue = null
        }
    }

    const [open, setOpen] = React.useState(false);

    const [selectedIssue, setSelectedIssue] = React.useState<string | null>(
        defaultValueLabel || null
    );

    const { issueQuery, setName, name: searchQuery } = useSelectIssues(type);

    useEffect(() => {
        issueQuery.refetch().then(() => {})

    }, [searchQuery])


    return (
        <div className="flex items-center space-x-4">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                        {selectedIssue ? <>{selectedIssue}</> : t('issue.select')}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="bottom" align="start">
                    <Command>
                        <CommandInput
                            placeholder={t('issue.search')}
                            value={searchQuery}
                            onValueChange={async (value) => {
                                setName(value);
                            }}
                        />
                        <CommandList>
                            <CommandEmpty>{t('common.notFound')}</CommandEmpty>
                            <CommandGroup>
                                {!issueQuery.isPending && issueQuery.data.map((issue) => (
                                    <CommandItem
                                        key={issue.id}
                                        value={issue.id.toString()}
                                        onSelect={(value) => {
                                            setSelectedIssue(issue.name);
                                            onValueChange(Number(value));
                                            setOpen(false);
                                        }}
                                        className={'cursor-pointer'}
                                    >
                                        {issue.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default IssueSelect;