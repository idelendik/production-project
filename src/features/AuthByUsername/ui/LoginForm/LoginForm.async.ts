import { FC, lazy } from "react";
import { LoginFormProps } from "./LoginForm";

// export const AboutPageAsync = lazy(() => new Promise(resolve => {
//     setTimeout(() => {
//         resolve(import("./AboutPage"));
//     }, 1100);
// }));

export const LoginFormAsync = lazy<FC<LoginFormProps>>(async () => {
    await new Promise(resolve => setTimeout(resolve, 1100));
    return import("./LoginForm");
});