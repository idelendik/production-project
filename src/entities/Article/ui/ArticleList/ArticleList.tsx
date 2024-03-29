import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ArticleList.module.scss';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../../ui/ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/AtricleListItemSkeleton';
import { useTranslation } from 'react-i18next';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { HTMLAttributeAnchorTarget } from 'react';
import { ArticleView } from '../../model/consts/consts';
import { ToggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => {
    return new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, idx) => (
            <ArticleListItemSkeleton
                className={cls.card}
                view={view}
                key={idx}
            />
        ));
};

export const ArticleList = (props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL,
        target,
    } = props;

    const { t } = useTranslation();

    if (!isLoading && !articles.length) {
        return (
            <div
                className={classNames(cls.ArticleList, {}, [
                    cls[view],
                    className,
                ])}
            >
                <Text size={TextSize.L} title={t('no_articles_found')} />
            </div>
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                // TODO: use 'react-window' or even 'react-virtuozo' instead of react-virtualized
                <HStack
                    wrap={'wrap'}
                    gap={'16'}
                    data-testid="ArticleList"
                    className={classNames(cls.ArticleListRedesigned, {}, [])}
                >
                    {articles.map((article) => (
                        <ArticleListItem
                            key={article.id}
                            article={article}
                            view={view}
                            target={target}
                            className={cls.card}
                        />
                    ))}
                    {isLoading && getSkeletons(view)}
                </HStack>
            }
            off={
                // TODO: use 'react-window' or even 'react-virtuozo' instead of react-virtualized
                <div
                    data-testid="ArticleList"
                    className={classNames(cls.ArticleList, {}, [
                        cls[view],
                        className,
                    ])}
                >
                    {articles.map((article) => (
                        <ArticleListItem
                            key={article.id}
                            article={article}
                            view={view}
                            target={target}
                            className={cls.card}
                        />
                    ))}
                    {isLoading && getSkeletons(view)}
                </div>
            }
        />
    );
};
