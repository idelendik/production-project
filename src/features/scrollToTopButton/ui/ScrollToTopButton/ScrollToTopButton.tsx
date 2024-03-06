import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ScrollToTopButton.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';

import ScrollIcon from '@/shared/assets/icons/scroll-icon-r.svg';

interface ScrollToTopButtonProps {
    className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
    const { className } = props;

    const onClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Icon
            Svg={ScrollIcon}
            width={32}
            height={32}
            clickable
            onClick={onClick}
            className={classNames(cls.ScrollToTopButton, {}, [className])}
        />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ScrollToTopButton.displayName = 'ScrollToTopButton';
