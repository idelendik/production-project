import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleSortSelector } from '@/features/articleSortSelector';
import { ArticleTypeTabs } from '@/features/articleTypeTabs';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/redesigned/Input';

import SearchIcon from '@/shared/assets/icons/search-icon.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ArticlesFIltersProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
    type: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFIltersProps) => {
    const { t } = useTranslation();
    const {
        className,
        type,
        onChangeType,
        onChangeSearch,
        search,
        onChangeSort,
        sort,
        onChangeOrder,
        order,
    } = props;

    return (
        <Card
            variant="outlined"
            className={classNames(cls.ArticlesFIlters, {}, [className])}
            padding="24"
        >
            <VStack gap="32">
                <Input
                    size="s"
                    data-testid="ArticlesPageFilters.Search"
                    placeholder={t('search_input_placeholder')}
                    value={search}
                    onChange={onChangeSearch}
                    addonLeft={<Icon Svg={SearchIcon} />}
                />

                <ArticleSortSelector
                    data-testid="ArticlesPageFilters.ArticleSortSelector"
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />

                <ArticleTypeTabs
                    data-testid="ArticlesPageFilters.ArticleTypeTabs"
                    value={type}
                    onChangeType={onChangeType}
                    className={cls.tabs}
                />
            </VStack>
        </Card>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ArticlesFilters.displayName = 'ArticlesFilters';
