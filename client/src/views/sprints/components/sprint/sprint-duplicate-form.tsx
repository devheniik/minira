import {Button} from "@/components/ui/button";
import {t} from "i18next";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {DuplicateSprintDto, SprintDto} from "@minira/server";
import {useState} from "react";

const SprintDuplicateForm = ({
    title = "Action",
    sprints,
    isPending,
    onSubmit,
    onClose,
}: {
    title?: string;
    sprints: SprintDto[];
    isPending: boolean;
    onSubmit: ({ id, data }: { id: number; data: DuplicateSprintDto }) => void;
    onClose: () => void;
}) => {
    const [currentSprint, setCurrentSprint] = useState<SprintDto | undefined>();
    const onOpenChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    const handleSubmit = (currentSprint: SprintDto | undefined) => {
        if (currentSprint) {

            const { id, ...formattedSprint } = currentSprint;
            onSubmit({
                data: formattedSprint,
                id
            });
        }
    };

    return (
        <Dialog open={true} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-1 py-1">
                    <div className="space-y-2">
                        <Select
                            value={currentSprint?.id.toString()}
                            onValueChange={(value) => {
                                const selectedSprint = sprints.find(
                                    (sprint) => sprint.id.toString() === value,
                                )

                                if (selectedSprint && !selectedSprint.description) {
                                    selectedSprint.description = "";
                                }

                                setCurrentSprint(selectedSprint);
                            }}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a Sprint" />
                            </SelectTrigger>
                            <SelectContent>
                                {sprints?.map((sprint) => (
                                    <SelectItem
                                        key={sprint.id}
                                        value={sprint.id.toString()}
                                    >
                                        {sprint.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mt-2">
                        <DialogFooter>
                            <Button
                                disabled={isPending || !currentSprint}
                                type="button"
                                onClick={() => handleSubmit(currentSprint)}
                            >
                                {t("Save")}
                            </Button>
                        </DialogFooter>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SprintDuplicateForm;
