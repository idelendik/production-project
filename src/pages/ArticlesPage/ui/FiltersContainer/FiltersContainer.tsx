import { memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo(({ className }: FiltersContainerProps) => {
    const {
        order,
        sort,
        search,
        type,
        onChangeOrder,
        onChangeSort,
        onChangeSearch,
        onChangeType,
    } = useArticleFilters();

    return (
        <ArticlesFilters
            className={className}
            onChangeType={onChangeType}
            onChangeSort={onChangeSort}
            onChangeSearch={onChangeSearch}
            onChangeOrder={onChangeOrder}
            type={type}
            search={search}
            order={order}
            sort={sort}
        />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
FiltersContainer.displayName = 'FiltersContainer';
