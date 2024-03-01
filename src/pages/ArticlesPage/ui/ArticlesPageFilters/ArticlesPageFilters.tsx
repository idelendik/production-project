import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ArticlesPageFilters.module.scss';

import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';
import { ArticleSortSelector } from '@/features/articleSortSelector';
import { ArticleTypeTabs } from '@/features/articleTypeTabs';
import { ArticleViewSelector } from '@/features/articleViewSelector';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = memo(
    ({ className }: ArticlesPageFiltersProps) => {
        const { t } = useTranslation();

        const {
            order,
            sort,
            view,
            search,
            type,
            onChangeOrder,
            onChangeSort,
            onChangeView,
            onChangeSearch,
            onChangeType,
        } = useArticleFilters();

        return (
            <div
                className={classNames(cls.ArticlesPageFilters, {}, [className])}
            >
                <div className={cls.sortWrapper}>
                    <ArticleSortSelector
                        data-testid="ArticlesPageFilters.ArticleSortSelector"
                        order={order}
                        sort={sort}
                        onChangeOrder={onChangeOrder}
                        onChangeSort={onChangeSort}
                    />
                    <ArticleViewSelector
                        view={view}
                        onViewClick={onChangeView}
                    />
                </div>
                <Card className={cls.search}>
                    <Input
                        data-testid="ArticlesPageFilters.Search"
                        placeholder={t('search_input_placeholder')}
                        value={search}
                        onChange={onChangeSearch}
                    />
                </Card>
                <ArticleTypeTabs
                    data-testid="ArticlesPageFilters.ArticleTypeTabs"
                    value={type}
                    onChangeType={onChangeType}
                    className={cls.tabs}
                />
            </div>
        );
    },
);

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ArticlesPageFilters.displayName = 'ArticlesPageFilters';
