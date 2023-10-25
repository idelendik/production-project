import { lazy } from "react";
import { FAKE_DELAY_MS } from "shared/const/time";

// export const AddCommentFormAsync = lazy(() => new Promise(resolve => {
//     setTimeout(() => {
//         resolve(import("./AddCommentForm"));
//     }, 1100);
// }));

export const AddCommentFormAsync = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, FAKE_DELAY_MS));
    return import("./AddCommentForm");
})