import * as React from "react";
import {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {Command, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {IssueDto} from "@minira/server";
import {t} from "i18next";
import {selectIssues} from "@/services/issue";
import {Primitive} from "react-hook-form";
import {debounce, isArray} from "lodash";

interface IssueSelectProps {
    defaultValue?: Primitive | readonly string[];
    defaultValueLabel?: string;
    onValueChange: (value: number) => void;
    type?: string;
}

const IssueSearchResults = ({
    query,
    type,
    onSelectResult,
}: {
    query: string;
    type: string;
    onSelectResult: (issue: IssueDto) => void;
}) => {
    const { data: issues = [], isLoading } = useQuery<IssueDto[]>({
        queryKey: ["issues", type, query],
        queryFn: () => selectIssues(type, query),
    });

    return (
        <CommandList>
            {!issues.length && !isLoading && (
                <div className="p-4 text-sm">{t("common.notFound")}</div>
            )}
            {issues.map((issue) => (
                <CommandItem
                    key={issue.id}
                    value={issue.id.toString()}
                    onSelect={() => onSelectResult(issue)}
                    className="cursor-pointer"
                >
                    {issue.name}
                </CommandItem>
            ))}
        </CommandList>
    );
};

const IssueSelect = ({
    defaultValue,
    defaultValueLabel,
    onValueChange,
    type = "",
}: IssueSelectProps) => {

    const [open, setOpen] = React.useState(false);

    const [query, setQuery] = React.useState("");
    const debouncedSetQuery = React.useMemo(() => debounce(setQuery, 300), []);

    React.useEffect(() => {
        debouncedSetQuery.cancel()
    }, [debouncedSetQuery]);

    const handleSetOpen = (open: boolean) => {
        setOpen(open)
        if (!open) {
            setQuery('')
        }
    }


    const [selectedIssue, setSelectedIssue] = React.useState<string | null>(
        defaultValueLabel || null
    );

    const handleSelectIssue = (issue: IssueDto) => {
        setSelectedIssue(issue.name);
        onValueChange(issue.id);
        setOpen(false);
        setQuery('')
    };

    if (isArray(defaultValue)){
        defaultValue = defaultValue[0]

        if (!defaultValue) {
            defaultValue = null
        }
    }

    useEffect(() => {
        if(!defaultValue) {
            setSelectedIssue(null)
        }
    }, [defaultValue]);

    return (
        <div className="flex items-center space-x-4">
            <Popover open={open} onOpenChange={handleSetOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                        {selectedIssue ? <>{selectedIssue}</> : t("issue.select")}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="bottom" align="start">
                    <Command shouldFilter={false}>
                        <CommandInput
                            placeholder={t("issue.search")}
                            onValueChange={debouncedSetQuery}
                        />
                        <IssueSearchResults
                            query={query}
                            type={type}
                            onSelectResult={handleSelectIssue}
                        />
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default IssueSelect;
