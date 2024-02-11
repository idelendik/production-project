import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./ThemeSwitcher.module.scss";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";

import ThemeSwitcherIcon from "@/shared/assets/icons/theme-switcher.svg";
import { Button } from "@/shared/ui/Button";
import { ButtonTheme } from "@/shared/ui/Button";
import { memo } from "react";

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { toggleTheme } = useTheme();

    return (
        <>
            <Button
                theme={ButtonTheme.CLEAR}
                className={classNames(cls.ThemeSwitcher,{}, [className])}
                onClick={toggleTheme}
            >
                <ThemeSwitcherIcon width='30px' height='30px' />
            </Button>
        </>

    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ThemeSwitcher.displayName = "ThemeSwitcher";