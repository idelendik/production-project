import { FC, lazy } from "react";
import { LoginFormProps } from "./LoginForm";
import { FAKE_DELAY_MS } from "shared/const/time";

// export const AboutPageAsync = lazy(() => new Promise(resolve => {
//     setTimeout(() => {
//         resolve(import("./AboutPage"));
//     }, 1100);
// }));

export const LoginFormAsync = lazy<FC<LoginFormProps>>(async () => {
    await new Promise(resolve => setTimeout(resolve, FAKE_DELAY_MS));
    return import("./LoginForm");
});