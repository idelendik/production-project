import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ScrollToolbar.module.scss';
import { ScrollToTopButton } from '@/features/scrollToTopButton';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ScrollToolbarProps {
    className?: string;
}

export const ScrollToolbar = memo(({ className }: ScrollToolbarProps) => {
    return (
        <VStack
            justify={'center'}
            align={'center'}
            max
            className={classNames(cls.ScrollToolbar, {}, [className])}
        >
            <ScrollToTopButton />
        </VStack>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ScrollToolbar.displayName = 'ScrollToolbar';
