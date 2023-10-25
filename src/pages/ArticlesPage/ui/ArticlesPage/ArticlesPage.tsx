import { classNames } from "shared/lib/classNames/classNames";

import cls from "./ArticlesPage.module.scss"
import { memo, useCallback } from "react";
import {
    ArticleList,
    ArticleView,
    ArticleViewSelector
} from "entities/Article";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articlesPageActions, articlesPageReducer, getArticles } from "../../model/slice/articlesPageSlice";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useSelector } from "react-redux";
import {
    getArticlesPageIsLoading,
    getArticlesPageView
} from "../../model/selectors/articlesPageSelectors";
import { Page } from "shared/ui/Page/Page";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";

interface ArticlesPageProps {
    className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch();

    const articles = useSelector(getArticles.selectAll);

    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);

    const onChangeView = useCallback((view:ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage());
    })

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <ArticleList articles={articles} isLoading={isLoading} view={view} />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);