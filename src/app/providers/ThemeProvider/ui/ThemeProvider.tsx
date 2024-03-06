import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme } from '@/shared/const/theme';
import { useJsonSettings } from '@/entities/User';
import { LOCAL_STORAGE_ITEM_KEY } from '@/shared/const/localStorage';

interface ThemeProviderProps {
    children?: ReactNode;
    initialTheme?: Theme;
}

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_ITEM_KEY) as Theme;

export const ThemeProvider = ({
    children,
    initialTheme,
}: ThemeProviderProps) => {
    const { theme: defaultTheme } = useJsonSettings();

    const [isThemeInited, setIsThemeInited] = useState(false);
    const [theme, setTheme] = useState<Theme>(
        initialTheme || fallbackTheme || Theme.LIGHT,
    );

    useEffect(() => {
        if (!isThemeInited && defaultTheme) {
            setTheme(defaultTheme);
            setIsThemeInited(true);
        }
    }, [isThemeInited, defaultTheme]);

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, theme);
    }, [theme]);

    const defaultProps = useMemo(
        () => ({
            theme: theme,
            setTheme: setTheme,
        }),
        [theme],
    );

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};
