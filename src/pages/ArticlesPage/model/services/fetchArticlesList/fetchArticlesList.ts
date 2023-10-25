import { createAsyncThunk } from "@reduxjs/toolkit";
import { Article } from "entities/Article";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getArticlesPageLimit } from "../../selectors/articlesPageSelectors";

interface FetchArticlesListProps {
    page?: number;
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
    "articlesPage/fetchArticlesList",
    async (args, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;
        const { page = 1 } = args;
        const limit = getArticlesPageLimit(getState());

        try {
            const response = await extra.api.get("/articles", {
                params: {
                    _expand: "user",
                    _page: page,
                    _limit: limit
                }
            });

            return response.data;
        } catch(e) {
            console.log(e);
            rejectWithValue("error");
        }
    }
)