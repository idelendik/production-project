import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Comment } from '../../model/types/comment';

import cls from './CommentCard.module.scss';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { AppLink as AppLinkdeprecated } from '@/shared/ui/deprecated/AppLink';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { getRouteProfile } from '@/shared/const/router';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo(
    ({ className, comment, isLoading }: CommentCardProps) => {
        const Skeleton = toggleFeatures({
            name: 'isAppRedesigned',
            on: () => SkeletonRedesigned,
            off: () => SkeletonDeprecated,
        });

        if (isLoading) {
            return (
                <VStack
                    gap="8"
                    max
                    className={classNames(cls.CommentCard, {}, [
                        className,
                        cls.loading,
                    ])}
                >
                    <div className={cls.header}>
                        <Skeleton
                            width={30}
                            height={30}
                            border="50%"
                            className={cls.header}
                        />
                        <Skeleton
                            width={100}
                            height={16}
                            className={cls.username}
                        />
                    </div>
                    <Skeleton width="100%" height={50} className={cls.text} />
                </VStack>
            );
        }

        if (!comment) {
            return null;
        }

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card padding={'24'} border={'round'} max>
                        <VStack
                            data-testid="CommentCard"
                            gap="8"
                            max
                            className={classNames(
                                cls.CommentCardRedesigned,
                                {},
                                [className],
                            )}
                        >
                            <AppLink to={getRouteProfile(comment.user.id)}>
                                <HStack gap={'8'}>
                                    <Avatar
                                        size={30}
                                        src={comment.user.avatar}
                                    />
                                    <Text bold text={comment.user.username} />
                                </HStack>
                            </AppLink>

                            <Text text={comment.text} />
                        </VStack>
                    </Card>
                }
                off={
                    <VStack
                        data-testid="CommentCard"
                        gap="8"
                        max
                        className={classNames(cls.CommentCard, {}, [className])}
                    >
                        <AppLinkdeprecated
                            to={getRouteProfile(comment.user.id)}
                            className={cls.header}
                        >
                            <AvatarDeprecated
                                size={30}
                                src={comment.user.avatar}
                            />
                            <TextDeprecated
                                className={cls.username}
                                title={comment.user.username}
                            />
                        </AppLinkdeprecated>

                        <TextDeprecated
                            className={cls.text}
                            text={comment.text}
                        />
                    </VStack>
                }
            />
        );
    },
);

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
CommentCard.displayName = 'CommentCard';
