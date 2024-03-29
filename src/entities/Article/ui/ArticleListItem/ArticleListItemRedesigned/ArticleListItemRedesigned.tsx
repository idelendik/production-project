import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ArticleListItemRedesigned.module.scss';
import { ArticleListItemProps } from '../ArticleListItem';
import { useTranslation } from 'react-i18next';
import { ArticleBlockType, ArticleView } from '../../../model/consts/consts';
import { ArticleTextBlock } from '../../../model/types/article';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ViewsIcon from '@/shared/assets/icons/views-icon.svg';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
    const { className, article, view, target } = props;

    const { t } = useTranslation();

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <Card
                padding={'24'}
                max
                data-testid="ArticleListItem"
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <VStack max gap={'16'}>
                    <HStack gap={'8'} max>
                        <Avatar
                            size={32}
                            src={article.user.avatar}
                            className={cls.avatar}
                        />
                        <Text bold text={article.user.username} />
                        <Text text={article.createdAt} className={cls.date} />
                    </HStack>
                    <Text bold title={article.title} />
                    <Text bold title={article.subtitle} size={'s'} />
                    <AppImage
                        fallback={<Skeleton width={'100%'} height={250} />}
                        src={article.img}
                        alt={article.title}
                        className={cls.img}
                    />
                    {textBlock?.paragraphs && (
                        <Text
                            className={cls.textBlock}
                            text={textBlock.paragraphs.slice(0, 2).join(' ')}
                        />
                    )}
                    <HStack max justify={'between'}>
                        <AppLink
                            target={target}
                            to={getRouteArticleDetails(article.id)}
                        >
                            <Button variant={'outline'}>
                                {t('read_more')}
                            </Button>
                        </AppLink>
                        <HStack gap={'8'}>
                            <Icon Svg={ViewsIcon} className={cls.icon} />
                            <Text
                                text={String(article.views)}
                                className={cls.views}
                            />
                        </HStack>
                    </HStack>
                </VStack>
            </Card>
        );
    }

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItemRedesigned, {}, [
                className,
                cls[view],
            ])}
        >
            <Card padding={'0'} className={cls.card} border={'round'}>
                <AppImage
                    fallback={<Skeleton width={'100%'} height={200} />}
                    src={article.img}
                    alt={article.title}
                    className={cls.img}
                />
                <VStack className={cls.info} gap={'4'}>
                    <Text text={article.title} className={cls.title} />
                    <VStack gap={'4'} className={cls.footer} max>
                        <HStack justify={'between'} max>
                            <Text
                                text={article.createdAt}
                                className={cls.date}
                            />
                            <HStack gap={'8'}>
                                <Icon Svg={ViewsIcon} />
                                <Text
                                    text={String(article.views)}
                                    className={cls.views}
                                />
                            </HStack>
                        </HStack>
                    </VStack>
                    <HStack gap={'4'}>
                        <Avatar
                            size={32}
                            src={article.user.avatar}
                            className={cls.avatar}
                        />
                        <Text bold text={article.user.username} />
                    </HStack>
                </VStack>
            </Card>
        </AppLink>
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ArticleListItemRedesigned.displayName = 'ArticleListItemRedesigned';
