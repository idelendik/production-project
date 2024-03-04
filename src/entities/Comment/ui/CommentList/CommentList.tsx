import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';

import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { useTranslation } from 'react-i18next';
import { CommentCard } from '../CommentCard/CommentCard';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo(
    ({ className, comments, isLoading }: CommentListProps) => {
        const { t } = useTranslation();

        if (isLoading) {
            return (
                <VStack
                    gap="16"
                    max
                    className={classNames('', {}, [className])}
                >
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                    <CommentCard isLoading />
                </VStack>
            );
        }

        return (
            <VStack gap="16" max className={classNames('', {}, [className])}>
                {comments?.length ? (
                    comments.map((comment) => (
                        <CommentCard
                            key={comment.id}
                            isLoading={isLoading}
                            comment={comment}
                        />
                    ))
                ) : (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={<Text text={t('no_comments_found')} />}
                        off={<TextDeprecated text={t('no_comments_found')} />}
                    />
                )}
            </VStack>
        );
    },
);

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
CommentList.displayName = 'CommentList';
