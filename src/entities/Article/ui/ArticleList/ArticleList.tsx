import { classNames } from "shared/lib/classNames/classNames";

import cls from "./ArticleList.module.scss"
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../../ui/ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/AtricleListItemSkeleton";

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => {
    return new Array(view === ArticleView.SMALL ? 9 : 3).fill(0).map((item, idx) => <ArticleListItemSkeleton className={cls.card} view={view} key={idx} />);
}

export const ArticleList = (props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.SMALL
    } = props;

    const renderArticle = (article: Article) => {
        return (
            <ArticleListItem key={article.id} article={article} view={view} className={cls.card} />
        )
    }

    return (
        <div className={classNames(cls.ArticleList,{}, [className, cls[view]])}>
            {articles.length > 0
                ? articles.map(renderArticle)
                : null
            }
            {isLoading && getSkeletons(view)}
        </div>
    );
};