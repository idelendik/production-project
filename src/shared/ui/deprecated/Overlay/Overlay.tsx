import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Overlay.module.scss';

interface OverlayProps {
    className?: string;
    onClick?: () => void;
}

/**
 * @deprecated
 */
export const Overlay = memo(({ className, onClick }: OverlayProps) => {
    return (
        <div
            onClick={onClick}
            className={classNames(cls.Overlay, {}, [className])}
        />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
Overlay.displayName = 'Overlay';
