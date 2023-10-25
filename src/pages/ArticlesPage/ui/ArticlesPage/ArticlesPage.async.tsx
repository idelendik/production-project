import { lazy } from "react";
import { FAKE_DELAY_MS } from "shared/const/time";

// export const ArticlesPageAsync = lazy(() => new Promise(resolve => {
//     setTimeout(() => {
//         resolve(import("./ArticlesPage"));
//     }, 1100);
// }));

export const ArticlesPageAsync = lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_MS));
    return import("./ArticlesPage");
});