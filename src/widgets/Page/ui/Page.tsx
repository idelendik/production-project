import { memo, MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Page.module.scss';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import {
    getScrollByPath,
    scrollRestorationActions,
} from '@/features/scrollRestoration';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { TestProps } from '@/shared/types/tests';
import { toggleFeatures } from '@/shared/lib/features';

interface PageProps extends TestProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;

    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    const scrollPosition = useSelector((state: StateSchema) =>
        getScrollByPath(state, pathname),
    );

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            scrollRestorationActions.setScrollPosition({
                path: pathname,
                position: e.currentTarget.scrollTop,
            }),
        );
    }, 500);

    return (
        <main
            onScroll={onScroll}
            ref={wrapperRef}
            className={classNames(
                toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => 'cls.Page',
                    on: () => 'cls.PageRedesigned',
                }),
                {},
                [className],
            )}
            id={PAGE_ID}
            data-testid={props['data-testid'] ?? 'Page'}
        >
            {children}
            {onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
        </main>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
Page.displayName = 'Page';
