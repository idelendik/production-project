import { classNames } from "shared/lib/classNames/classNames";

import cls from "./Sidebar.module.scss";
import { useState } from "react";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import { LangSwitcher } from "shared/ui/LangSwitcher";
import { useTranslation } from "react-i18next";

interface SidebarProps {
    className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const onToggle = () => setCollapsed(prev => !prev);

    const { t } = useTranslation();

    return (
        <div data-testid="sidebar" className={classNames(cls.Sidebar,{ [cls.collapsed]: collapsed }, [className])}>
            <button data-testid="sidebar-toggle" onClick={onToggle}>{collapsed ? t("Show menu") : t("Hide menu")}</button>

            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.lang} />
            </div>
        </div>
    );
};