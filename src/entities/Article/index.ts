export {
    ArticleDetails
} from "./ui/ArticleDetails/ArticleDetails";

export { ArticleDetailsSchema } from "./model/types/articleDetailsSchema";

export { Article, ArticleType, ArticleBlockType } from "./model/types/article";

export {
    articleDetailsActions,
    articleDetailsReducer
} from "./model/slice/articleDetailsSlice";

export {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading
} from "./model/selectors/articleDetails";