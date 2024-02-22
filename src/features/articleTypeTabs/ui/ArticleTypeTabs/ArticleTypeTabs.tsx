import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import { TabItem, Tabs } from '@/shared/ui/Tabs';
import { useTranslation } from 'react-i18next';
import { ArticleType } from '@/entities/Article';

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { t } = useTranslation();

    const { className, value, onChangeType } = props;

    const typeTabs = useMemo<TabItem[]>(
        () => [
            { content: t('all_type'), value: ArticleType.ALL },
            { content: t('business_type'), value: ArticleType.BUSINESS },
            { content: t('it_type'), value: ArticleType.IT },
            { content: t('science_type'), value: ArticleType.SCIENCE },
        ],
        [t],
    );

    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.value as ArticleType);
        },
        [onChangeType],
    );

    return (
        <Tabs
            data-testid="ArticleTypeTabs"
            tabs={typeTabs}
            value={value}
            onTabClick={onTabClick}
            className={classNames('', {}, [className])}
        />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ArticleTypeTabs.displayName = 'ArticleTypeTabs';
