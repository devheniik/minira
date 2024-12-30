import { useState } from "react";
import ConfirmDialog from "@/components/dialog/confirm-dialog.tsx";

type ConfirmDialogProps = {
    title: string;
    message: string;
};

type UseConfirmDialogReturn = {
    openConfirmDialog: (onConfirm: () => void) => void;
    ConfirmDialogComponent: (props: ConfirmDialogProps) => JSX.Element;
};

const useConfirmDialog = (): UseConfirmDialogReturn => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [onConfirmCallback, setOnConfirmCallback] = useState<
        (() => void) | null
            >(null);

    const openConfirmDialog = (onConfirm: () => void): void => {
        setOnConfirmCallback(() => onConfirm);
        setIsOpen(true);
    };

    const handleConfirm = (): void => {
        if (onConfirmCallback) {
            onConfirmCallback();
        }
        setIsOpen(false);
    };

    const handleCancel = (): void => {
        setIsOpen(false);
    };

    const ConfirmDialogComponent = ({
        title,
        message,
    }: ConfirmDialogProps): JSX.Element => (
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
