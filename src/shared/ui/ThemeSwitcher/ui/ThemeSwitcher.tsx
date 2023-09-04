import { classNames } from "shared/lib/classNames/classNames";

import cls from "./ThemeSwitcher.module.scss";
import { Theme, useTheme } from "app/providers/ThemeProvider";

import ThemeSwitcherDark from "shared/assets/icons/theme-switcher-dark.svg";
import ThemeSwitcherLight from "shared/assets/icons/theme-switcher-light.svg";
import { Button } from "shared/ui/Button";
import { ButtonTheme } from "shared/ui/Button/ui/Button";

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <Button
                theme={ButtonTheme.CLEAR}
                className={classNames(cls.ThemeSwitcher,{}, [className])}
                onClick={toggleTheme}
            >
                {theme === Theme.DARK ? <ThemeSwitcherDark width='30px' height='30px' /> : <ThemeSwitcherLight width='30px' height='30px' /> }
            </Button>
        </>

    );
};