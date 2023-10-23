import { ArticleDetailsSchema } from "../types/articleDetailsSchema";
import { Article } from "../types/article";
import { articleDetailsReducer } from "../slice/articleDetailsSlice"
import { fetchArticleById } from "../services/fetchArticleById/fetchArticleById";

const data: Article = {
    id: "1",
    title: "Title",
    subtitle: "Subtitle",
    img: "",
    views: 0,
    blocks: [],
    type: [],
    createdAt: "",
    user: { id: "1", username: "User" },
}

describe("articleDetailsSlice.test", () => {
    test("fetchArticleById fulfilled", () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            data,
        }

        expect(articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.fulfilled(data, "", "1"))).toEqual({
            data,
            isLoading: false,
            error: undefined,
        })
    })

    test("fetchArticleById pending", () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: true,
        }

        expect(articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.fulfilled(data, "", "1"))).toEqual({
            data,
            isLoading: false,
            error: undefined,
        })
    })

    test("fetchArticleById rejected", () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            error: "error"
        }

        expect(articleDetailsReducer(state as ArticleDetailsSchema, fetchArticleById.rejected(new Error(), "", "", "error"))).toEqual({
            isLoading: false,
            error: "error"
        })
    })
})