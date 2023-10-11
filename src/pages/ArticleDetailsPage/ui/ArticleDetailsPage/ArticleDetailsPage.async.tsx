import { lazy } from "react";

// export const ArticleDetailsPageAsync = lazy(() => new Promise(resolve => {
//     setTimeout(() => {
//         resolve(import("./ArticleDetailsPage"));
//     }, 1100);
// }));

export const ArticleDetailsPageAsync = lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1100));
    return import("./ArticleDetailsPage");
});