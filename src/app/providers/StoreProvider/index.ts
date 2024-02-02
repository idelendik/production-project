import { StoreProvider } from "./ui/StoreProvider";
import { createReduxStore, AppDispatch } from "./config/store";
import type { StateSchema, ReduxStoreWithManager, ThunkExtraArg, ThunkConfig } from "./config/StateSchema";

export type { AppDispatch }

export {
    StoreProvider,
    createReduxStore,
    ReduxStoreWithManager,
    ThunkExtraArg,
    StateSchema,
    ThunkConfig,
}