import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ThemeSwitcher.module.scss';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

import ThemeSwitcherIcon from '@/shared/assets/icons/theme-switcher.svg';
import { Button } from '@/shared/ui/Button';
import { ButtonTheme } from '@/shared/ui/Button';
import { memo, useCallback } from 'react';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

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
        <>
            <Button
                theme={ButtonTheme.CLEAR}
                className={classNames(cls.ThemeSwitcher, {}, [className])}
                onClick={onToggleHandler}
            >
                <ThemeSwitcherIcon width="30px" height="30px" />
            </Button>
        </>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ThemeSwitcher.displayName = 'ThemeSwitcher';
