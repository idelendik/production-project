import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AppLogo.module.scss';

import LogoIcon from '../../../assets/icons/logo-icon.svg';
import { HStack } from '../Stack';

interface AppLogoProps {
    className?: string;
    size?: number;
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => {
    return (
        <HStack
            max
            justify="center"
            className={classNames(cls.appLogoWrapper, {}, [className])}
        >
            <div className={cls.gradientBig}></div>
            <div className={cls.gradientSmall}></div>
            <LogoIcon
                width={size}
                height={size}
                color={'black'}
                className={cls.AppLogo}
            />
        </HStack>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
AppLogo.displayName = 'AppLogo';
