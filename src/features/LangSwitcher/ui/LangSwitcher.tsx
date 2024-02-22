import { classNames } from '@/shared/lib/classNames/classNames';

import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { memo } from 'react';
import FlagRU from '@/shared/assets/icons/flag-ru-icon.svg';
import FlagUS from '@/shared/assets/icons/flag-us-icon.svg';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
    const { i18n } = useTranslation();

    const changeLangHandler = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            className={classNames('', {}, [className])}
            theme={ButtonTheme.CLEAR}
            onClick={changeLangHandler}
        >
            {i18n.language === 'ru' ? (
                <FlagUS width={30} height={30} />
            ) : (
                <FlagRU width={30} height={30} />
            )}
        </Button>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
LangSwitcher.displayName = 'LangSwitcher';
