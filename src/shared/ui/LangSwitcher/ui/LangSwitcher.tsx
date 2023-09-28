import { classNames } from "shared/lib/classNames/classNames";

import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button";
import { ButtonTheme } from "shared/ui/Button/ui/Button";
import { FLAG_EN, FLAG_RU } from "shared/consts/consts";
import { memo } from "react";

interface LangSwitcherProps {
    className?: string
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
    const { i18n } = useTranslation();

    const changeLangHandler = ()=> {
        i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
    };

    return (
        <Button
            className={classNames(null,{}, [className])}
            theme={ButtonTheme.CLEAR}
            onClick={changeLangHandler}>
            {i18n.language === "ru" ? FLAG_EN : FLAG_RU}
        </Button>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
LangSwitcher.displayName = "LangSwitcher";