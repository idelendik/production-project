import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import { Story } from "@storybook/react";
import { loginReducer } from "features/AuthByUsername/model/slice/loginSlice";
import { profileReducer } from "entities/Profile";
import { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsReducer } from "entities/Article";

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
}

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList
    // eslint-disable-next-line react/display-name
) => (StoryComponent: Story) => (
    <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
    </StoreProvider>
)