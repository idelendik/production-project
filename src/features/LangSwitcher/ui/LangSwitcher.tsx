import { classNames } from '@/shared/lib/classNames/classNames';

import { useTranslation } from 'react-i18next';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { memo } from 'react';
import FlagRU from '@/shared/assets/icons/flag-ru-icon.svg';
import FlagUS from '@/shared/assets/icons/flag-us-icon.svg';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const changeLangHandler = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Button variant="clear" onClick={changeLangHandler}>
                    {t(short ? 'lang_short' : 'lang')}
                </Button>
            }
            off={
                <ButtonDeprecated
                    className={classNames('', {}, [className])}
                    theme={ButtonTheme.CLEAR}
                    onClick={changeLangHandler}
                >
                    {i18n.language === 'ru' ? (
                        <FlagUS width={30} height={30} />
                    ) : (
                        <FlagRU width={30} height={30} />
                    )}
                </ButtonDeprecated>
            }
        />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
LangSwitcher.displayName = 'LangSwitcher';
