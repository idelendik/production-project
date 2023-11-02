import { createAsyncThunk } from "@reduxjs/toolkit";
import { Article, ArticleType } from "entities/Article";
import { ThunkConfig } from "app/providers/StoreProvider";
import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType
} from "../../selectors/articlesPageSelectors";
import { addQueryParams } from "shared/lib/url/addQueryParams/addQueryParams";

interface FetchArticlesListProps {
    replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
    "articlesPage/fetchArticlesList",
    async (args, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;
        const limit = getArticlesPageLimit(getState());

        const page = getArticlesPageNum(getState())
        const sort = getArticlesPageSort(getState());
        const order = getArticlesPageOrder(getState());
        const search = getArticlesPageSearch(getState());
        const type = getArticlesPageType(getState());

        try {
            addQueryParams({
                sort,
                order,
                search,
                type,
            });

            const response = await extra.api.get("/articles", {
                params: {
                    _expand: "user",
                    _page: page,
                    _limit: limit,
                    _sort: sort,
                    _order: order,
                    type: type === ArticleType.ALL ? undefined : type,
                    q: search,
                }
            });

            return response.data;
        } catch(e) {
            console.log(e);
            rejectWithValue("error");
        }
    }
)