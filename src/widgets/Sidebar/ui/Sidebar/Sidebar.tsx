import { classNames } from "shared/lib/classNames/classNames";

import cls from "./Sidebar.module.scss";
import { memo, useMemo, useState } from "react";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import { LangSwitcher } from "shared/ui/LangSwitcher";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/ui/Button";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { getSidebarItems } from "../../model/selectors/getSidebarItems";
import { useSelector } from "react-redux";

interface SidebarProps {
    className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const sidebarItemsList = useSelector(getSidebarItems);

    const onToggle = () => setCollapsed(prev => !prev);

    const itemsList = useMemo(() => sidebarItemsList.map((item) => (
        <SidebarItem key={item.path} item={item} collapsed={collapsed} />
    )), [collapsed, sidebarItemsList]);

    return (
        <div data-testid="sidebar" className={classNames(cls.Sidebar,{ [cls.collapsed]: collapsed }, [className])}>
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                square
                size={ButtonSize.L}
            >
                {collapsed ? ">" : "<"}
            </Button>

            <div className={cls.items}>
                {itemsList}
            </div>

            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.lang} />
            </div>
        </div>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
Sidebar.displayName = "Sidebar";