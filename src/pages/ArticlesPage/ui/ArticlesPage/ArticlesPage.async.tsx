import { lazy } from "react";

// export const ArticlesPageAsync = lazy(() => new Promise(resolve => {
//     setTimeout(() => {
//         resolve(import("./ArticlesPage"));
//     }, 1100);
// }));

export const ArticlesPageAsync = lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1100));
    return import("./ArticlesPage");
});