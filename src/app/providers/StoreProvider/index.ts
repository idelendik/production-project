import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore, AppDispatch } from './config/store';
import type {
    StateSchema,
    ReduxStoreWithManager,
    ThunkExtraArg,
    ThunkConfig,
} from './config/StateSchema';

export type { AppDispatch, StateSchema, ThunkConfig };

export {
    StoreProvider,
    createReduxStore,
    ReduxStoreWithManager,
    ThunkExtraArg,
};
