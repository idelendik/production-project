import cls from "./SidebarItem.module.scss"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { SidebarItemType } from "../../model/items";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = ({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();

    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
            className={classNames(cls.item, { [cls.collapsed]: collapsed })}
        >
            {collapsed ? <item.Icon width="30" height="30" /> : <span>{t(item.text)}</span>}
        </AppLink>
    );
};