import { classNames } from "shared/lib/classNames/classNames";

import cls from "./ThemeSwitcher.module.scss";
import { Theme, useTheme } from "app/providers/ThemeProvider";

import ThemeSwitcherDark from "shared/assets/icons/theme-switcher-dark.svg";
import ThemeSwitcherLight from "shared/assets/icons/theme-switcher-light.svg";
import { Button } from "shared/ui/Button";
import { ButtonTheme } from "shared/ui/Button/ui/Button";
import { memo } from "react";

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <Button
                theme={ButtonTheme.CLEAR}
                className={classNames(cls.ThemeSwitcher,{}, [className])}
                onClick={toggleTheme}
            >
                {theme === Theme.DARK ? <ThemeSwitcherLight width='30px' height='30px' /> : <ThemeSwitcherDark width='30px' height='30px' /> }
            </Button>
        </>

    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ThemeSwitcher.displayName = "ThemeSwitcher";