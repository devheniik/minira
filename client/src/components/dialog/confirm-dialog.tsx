import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { t } from "i18next";

const ConfirmDialog = ({
    isOpen,
    onConfirm,
    onCancel,
    title,
    message,
}: {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    message: string;
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p>{message}</p>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onCancel}>
                        {t("Cancel")}
                    </Button>
                    <Button onClick={onConfirm}>{t("Confirm")}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDialog;
