import { memo } from 'react';

import { ArticleViewSelector } from '@/features/articleViewSelector';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo(
    ({ className }: ViewSelectorContainerProps) => {
        const { view, onChangeView } = useArticleFilters();

        return (
            <ArticleViewSelector
                className={className}
                view={view}
                onViewClick={onChangeView}
            />
        );
    },
);

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ViewSelectorContainer.displayName = 'ViewSelectorContainer';
