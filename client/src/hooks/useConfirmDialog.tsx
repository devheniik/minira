import { useState } from "react";
import ConfirmDialog from "@/components/dialog/confirm-dialog.tsx";

const useConfirmDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [onConfirmCallback, setOnConfirmCallback] = useState<
        (() => void) | null
            >(null);

    const openConfirmDialog = (onConfirm: () => void) => {
        setOnConfirmCallback(() => onConfirm);
        setIsOpen(true);
    };

    const handleConfirm = () => {
        if (onConfirmCallback) {
            onConfirmCallback();
        }
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const ConfirmDialogComponent = ({
        title,
        message,
    }: {
        title: string;
        message: string;
    }) => (
        <ConfirmDialog
            isOpen={isOpen}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            title={title}
            message={message}
        />
    );

    return { openConfirmDialog, ConfirmDialogComponent };
};

export default useConfirmDialog;
