import { memo } from "react";
import { ArticleList } from "entities/Article";
import { useSelector } from "react-redux";
import { getArticles } from "../../model/slice/articlesPageSlice";
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView
} from "../../model/selectors/articlesPageSelectors";
import { Text } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";

interface ArticleInfiniteListProps {
    className?: string
}

export const ArticleInfiniteList = memo(({ className }: ArticleInfiniteListProps) => {
    const { t } = useTranslation();
    const articles = useSelector(getArticles.selectAll);

    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);

    if (error) {
        return <Text text={t("error_loading_articles")}/>
    }

    return (
        <ArticleList className={className} articles={articles} isLoading={isLoading} view={view} />
    );
});

// Fix for memo - ESLint: Component definition is missing display name(react/display-name)
ArticleInfiniteList.displayName = "ArticleInfiniteList"