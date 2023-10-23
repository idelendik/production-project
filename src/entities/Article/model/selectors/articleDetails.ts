import { StateSchema } from "app/providers/StoreProvider";
import { Article } from "../types/article";

export const defaultArticleDetails: Article = {
    title: "",
    id: "",
    blocks: [],
    views: 0,
    img: "",
    subtitle: "",
    type: [],
    createdAt: "",
    user: { id: "1", username: "User" }
}

export const getArticleDetailsData = (state: StateSchema) => state.articleDetails?.data;

export const getArticleDetailsIsLoading = (state: StateSchema) => state.articleDetails?.isLoading || false;

export const getArticleDetailsError = (state: StateSchema) => state.articleDetails?.error;