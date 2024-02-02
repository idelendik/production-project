import { classNames } from "shared/lib/classNames/classNames";

import cls from "./ArticleList.module.scss"
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../../ui/ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/AtricleListItemSkeleton";
import { useTranslation } from "react-i18next";
import { Text, TextSize } from "shared/ui/Text/Text";
import { HTMLAttributeAnchorTarget } from "react";
import { List, ListRowProps, WindowScroller } from "react-virtualized";
import { PAGE_ID } from "widgets/Page/Page";

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    virtualised?: boolean;
}

const getSkeletons = (view: ArticleView) => {
    return new Array(view === ArticleView.SMALL ? 9 : 3).fill(0).map((item, idx) => <ArticleListItemSkeleton className={cls.card} view={view} key={idx} />);
}

export const ArticleList = (props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL,
        target,
        virtualised = true,
    } = props;

    const { t } = useTranslation();

    const isBig = view === ArticleView.BIG;
    const itemsPerRow = isBig ? 1 : 3;
    const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);

    const rowRenderer = ({ index, key, style }: ListRowProps) => {
        const items = [];
        const fromIndex = index * itemsPerRow;
        const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

        for(let i = fromIndex; i < toIndex; i++) {
            items.push(
                <ArticleListItem
                    article={articles[i]}
                    view={view}
                    target={target}
                    className={cls.card}
                    key={articles[i].id}
                />
            )
        }

        return (
            <div key={key} className={cls.row} style={style}>
                {items}
            </div>
        )
    };

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList,{}, [cls[view], className])}>
                <Text size={TextSize.L} title={t("no_articles_found")} />
            </div>
        )
    }

    return (
        <WindowScroller
            scrollElement={document.getElementById(PAGE_ID) as Element}
        >
            {({
                width,
                height,
                registerChild,
                onChildScroll,
                isScrolling,
                scrollTop
            }) => (
                // TODO: use 'react-window' or even 'react-virtuozo' instead
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <div ref={registerChild} className={classNames(cls.ArticleList,{}, [cls[view], className])}>
                    {virtualised
                        ? (
                            <List
                                rowCount={rowCount}
                                height={height ?? 700}
                                rowHeight={isBig ? 700: 330}
                                rowRenderer={rowRenderer}
                                width={width ? width - 80: 700}
                                onScroll={onChildScroll}
                                isScrolling={isScrolling}
                                scrollTop={scrollTop}
                                autoHeight
                            />
                        )
                        : (
                            articles.map(article => (
                                <ArticleListItem
                                    key={article.id}
                                    article={article}
                                    view={view}
                                    target={target}
                                    className={cls.card}
                                />
                            ))
                        )
                    }
                    {isLoading && getSkeletons(view)}
                </div>

            )}
        </WindowScroller>
    );
};