import { useAuth } from "@/hooks/useAuth.ts";
import useConfirmDialog from "@/hooks/useConfirmDialog.tsx";
import { t } from "i18next";

import {
    SidebarMenuButton,
    SidebarMenuButtonContentDiv,
} from "@/components/ui/sidebar";

const SidebarLogOut = () => {
    const { onLogout } = useAuth();
    const { openConfirmDialog, ConfirmDialogComponent } = useConfirmDialog();
    const handleLogOut = () => {
        openConfirmDialog(async () => {
            if (onLogout) {
                await onLogout();
            }
        });
    };
    return (
        <>
            <SidebarMenuButton onClick={handleLogOut}>
                <SidebarMenuButtonContentDiv title="Log out" icon="log-out" />
            </SidebarMenuButton>
            <ConfirmDialogComponent
                title={t("Confirm Log Out")}
                message={t("Are you sure you want to log out?")}
            />
        </>
    );
};

export default SidebarLogOut;
