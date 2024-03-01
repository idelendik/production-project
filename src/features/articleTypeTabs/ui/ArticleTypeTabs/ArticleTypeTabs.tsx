import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { useTranslation } from 'react-i18next';
import { ArticleType } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

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
            { content: t('articles_all_type'), value: ArticleType.ALL },
            {
                content: t('articles_business_type'),
                value: ArticleType.BUSINESS,
            },
            { content: t('articles_it_type'), value: ArticleType.IT },
            { content: t('articles_science_type'), value: ArticleType.SCIENCE },
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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Tabs
                    direction="column"
                    data-testid="ArticleTypeTabs"
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            }
            off={
                <TabsDeprecated
                    data-testid="ArticleTypeTabs"
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            }
        />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ArticleTypeTabs.displayName = 'ArticleTypeTabs';
