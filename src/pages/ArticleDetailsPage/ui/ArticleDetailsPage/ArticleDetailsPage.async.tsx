import { lazy } from "react";
import { FAKE_DELAY_MS } from "shared/const/time";

// export const ArticleDetailsPageAsync = lazy(() => new Promise(resolve => {
//     setTimeout(() => {
//         resolve(import("./ArticleDetailsPage"));
//     }, 1100);
// }));

export const ArticleDetailsPageAsync = lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_MS));
    return import("./ArticleDetailsPage");
});