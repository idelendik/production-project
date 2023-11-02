import { createAsyncThunk } from "@reduxjs/toolkit";
import { articlesPageActions } from "pages/ArticlesPage/model/slice/articlesPageSlice";
import { fetchArticlesList } from "pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList";
import { getArticlesPageInited } from "pages/ArticlesPage/model/selectors/articlesPageSelectors";
import { ThunkConfig } from "app/providers/StoreProvider";
import { SortOrder } from "shared/types";
import { ArticleSortField, ArticleType } from "entities/Article";

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>(
    "articlesPage/initArticlesPage",
    async (searchParams, thunkAPI) => {
        const { getState, dispatch } = thunkAPI;

        const inited = getArticlesPageInited(getState());

        if(!inited) {
            const orderFromURL = searchParams.get("order") as SortOrder;
            const sortFromURL = searchParams.get("sort") as ArticleSortField;
            const searchFromURL = searchParams.get("search");
            const typeFromURL = searchParams.get("type") as ArticleType;

            if(orderFromURL) {
                dispatch(articlesPageActions.setOrder(orderFromURL));
            }

            if(sortFromURL) {
                dispatch(articlesPageActions.setSort(sortFromURL));
            }

            if(searchFromURL) {
                dispatch(articlesPageActions.setSearch(searchFromURL));
            }

            if(typeFromURL) {
                dispatch(articlesPageActions.setType(typeFromURL));
            }

            dispatch(articlesPageActions.initState());

            dispatch(fetchArticlesList({}));
        }
    }
);