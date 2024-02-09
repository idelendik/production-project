import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Theme } from "@/shared/const/theme";
import { LOCAL_STORAGE_ITEM_KEY } from "../../../const/localStorage"

interface useThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

export function useTheme(): useThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    document.body.className = theme || "";

    const toggleTheme = () => {
        let newTheme;
        switch (theme) {
        case Theme.DARK:
            newTheme = Theme.LIGHT;
            break;
        case Theme.LIGHT:
            newTheme = Theme.ORANGE;
            break;
        case Theme.ORANGE:
            newTheme = Theme.DARK;
            break;
        default:
            newTheme = Theme.LIGHT;
        }
        setTheme?.(newTheme);
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_ITEM_KEY, newTheme);
    };

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme
    };
}