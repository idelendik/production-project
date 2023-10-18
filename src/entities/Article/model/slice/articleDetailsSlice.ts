import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticleDetailsSchema } from "../types/articleDetailsSchema";
import { fetchArticleById } from "../services/fetchArticleById/fetchArticleById";
import { Article } from "../types/article";

const initialState: ArticleDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
}

const articleDetailsSlice = createSlice({
    name: "articleDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (
                state
            ) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleById.fulfilled, (
                state,
                action: PayloadAction<Article>
            ) => {
                state.isLoading = false;
                state.error = undefined;
                state.data = action.payload;
            })
            .addCase(fetchArticleById.rejected, (
                state,
                action
            ) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const { reducer: articleDetailsReducer } = articleDetailsSlice;
export const { actions: articleDetailsActions } = articleDetailsSlice;