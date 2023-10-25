import { createAsyncThunk } from "@reduxjs/toolkit";
import { articlesPageActions } from "pages/ArticlesPage/model/slice/articlesPageSlice";
import { fetchArticlesList } from "pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList";
import { getArticlesPageInited } from "pages/ArticlesPage/model/selectors/articlesPageSelectors";
import { ThunkConfig } from "app/providers/StoreProvider";

export const initArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    "articlesPage/initArticlesPage",
    async (_, thunkAPI) => {
        const { getState, dispatch } = thunkAPI;

        const inited = getArticlesPageInited(getState());

        if(!inited) {
            dispatch(articlesPageActions.initState());

            dispatch(fetchArticlesList({
                page: 1
            }));
        }
    }
);