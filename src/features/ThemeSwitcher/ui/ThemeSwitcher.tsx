import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ThemeSwitcher.module.scss';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

import ThemeSwitcherIconDeprecated from '@/shared/assets/icons/theme-switcher.svg';
import ThemeSwitcherIcon from '@/shared/assets/icons/theme-switcher-r.svg';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { memo, useCallback } from 'react';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [dispatch, toggleTheme]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Icon
                    Svg={ThemeSwitcherIcon}
                    clickable
                    onClick={onToggleHandler}
                />
            }
            off={
                <Button
                    theme={ButtonTheme.CLEAR}
                    className={classNames(cls.ThemeSwitcher, {}, [className])}
                    onClick={onToggleHandler}
                >
                    <ThemeSwitcherIconDeprecated width="30px" height="30px" />
                </Button>
            }
        />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ThemeSwitcher.displayName = 'ThemeSwitcher';
