import { useAuth } from "@/hooks/useAuth.ts";
import useConfirmDialog from "@/hooks/useConfirmDialog.tsx";
import { t } from "i18next";

const LogOut = () => {
    const { onLogout } = useAuth();
    const { openConfirmDialog, ConfirmDialogComponent } = useConfirmDialog();

    const handleLogOut = () => {
        openConfirmDialog(() => onLogout);
    };

    return (
        <>
            <button onClick={handleLogOut}>Log Out</button>
            <ConfirmDialogComponent
                title={t("Confirm Log Out")}
                message={t("Are you sure you want to log out?")}
            />
        </>
    );
};

export default LogOut;
