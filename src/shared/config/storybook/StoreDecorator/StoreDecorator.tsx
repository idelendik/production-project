import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";
import { Story } from "@storybook/react";
// eslint-disable-next-line
import { loginReducer } from "@/features/AuthByUsername/model/slice/loginSlice";
import { profileReducer } from "@/features/editableProfileCard";
import { ReducersList } from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsReducer } from "@/entities/Article";
// eslint-disable-next-line
import { addCommentFormReducer } from "@/features/addCommentForm/model/slice/addCommentFormSlice";
// eslint-disable-next-line
import { articleDetailsPageReducer } from "@/pages/ArticleDetailsPage/model/slice";
// eslint-disable-next-line
import { articlesPageReducer } from "@/pages/ArticlesPage/model/slice/articlesPageSlice";

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articlesPage: articlesPageReducer,
    articleDetailsPage: articleDetailsPageReducer,
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