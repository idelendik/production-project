import { memo } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/ui/redesigned/Card';

interface DetailsContainerProps {
    className?: string;
}

export const DetailsContainer = memo(({ className }: DetailsContainerProps) => {
    const { id } = useParams<{ id: string }>();

    return (
        <Card border={'round'} className={className} padding={'24'}>
            <ArticleDetails id={id} />
        </Card>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
DetailsContainer.displayName = 'DetailsContainer';
