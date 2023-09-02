import { lazy } from "react";

// export const AboutPageAsync = lazy(() => new Promise(resolve => {
//     setTimeout(() => {
//         resolve(import("./AboutPage"));
//     }, 1100);
// }));

export const AboutPageAsync = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, 1100));
    return import("./AboutPage");
});