import { lazy } from "react";
import { FAKE_DELAY_MS } from "shared/const/time";

// export const MainPageAsync = lazy(() => new Promise(resolve => {
//     setTimeout(() => {
//         resolve(import("./MainPage"));
//     }, 1100);
// }));

export const ProfilePageAsync = lazy(async () => {
    await new Promise(resolve => setTimeout(resolve, FAKE_DELAY_MS));
    return import("./ProfilePage");
});