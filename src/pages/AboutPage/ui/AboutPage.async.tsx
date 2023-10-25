import { lazy } from "react";
import { FAKE_DELAY_MS } from "shared/const/time";

// export const AboutPageAsync = lazy(() => new Promise(resolve => {
//     setTimeout(() => {
//         resolve(import("./AboutPage"));
//     }, 1100);
// }));

export const AboutPageAsync = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, FAKE_DELAY_MS));
    return import("./AboutPage");
});