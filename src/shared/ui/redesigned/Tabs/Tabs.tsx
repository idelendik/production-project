import { memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Tabs.module.scss';
import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
    direction?: FlexDirection;
}

export const Tabs = memo((props: TabsProps) => {
    const { className, tabs, value, onTabClick, direction = 'row' } = props;

    const clickHandle = useCallback(
        (tab: TabItem) => {
            return () => {
                onTabClick(tab);
            };
        },
        [onTabClick],
    );

    return (
        <Flex
            direction={direction}
            gap="8"
            align="start"
            className={classNames(cls.Tabs, {}, [className])}
        >
            {tabs.map((tab) => {
                const isSelected = tab.value === value;

                return (
                    <Card
                        data-testid={`Tab.${tab.value
                            .replace(' ', '_')
                            .toLowerCase()}`}
                        key={tab.value}
                        className={classNames(
                            cls.tab,
                            { [cls.selected]: isSelected },
                            [],
                        )}
                        variant={isSelected ? 'light' : 'normal'}
                        onClick={clickHandle(tab)}
                        border="round"
                    >
                        {tab.content}
                    </Card>
                );
            })}
        </Flex>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
Tabs.displayName = 'Tabs';
