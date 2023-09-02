import { lazy } from "react";

// export const MainPageAsync = lazy(() => new Promise(resolve => {
//     setTimeout(() => {
//         resolve(import("./MainPage"));
//     }, 1100);
// }));

export const MainPageAsync = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, 1100));
    return import("./MainPage");
});