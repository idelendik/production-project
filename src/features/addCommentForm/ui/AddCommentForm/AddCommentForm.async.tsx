import { lazy } from "react";

// export const AddCommentFormAsync = lazy(() => new Promise(resolve => {
//     setTimeout(() => {
//         resolve(import("./AddCommentForm"));
//     }, 1100);
// }));

export const AddCommentFormAsync = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, 1100));
    return import("./AddCommentForm");
})