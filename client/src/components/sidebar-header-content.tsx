import { t } from "i18next";
import { Icon } from "./wrappers/icon";

const SidebarHeaderContent = () => {
    return (
        <div className="flex items-center gap-2">
            <Icon name="minira" />
            <span className="text-orange-50">{t("Minira")}</span>
        </div>
    );
};

export default SidebarHeaderContent;
