import { StateSchema, StoreProvider } from "app/providers/StoreProvider";
import { Story } from "@storybook/react";
import { DeepPartial } from "@reduxjs/toolkit";


// eslint-disable-next-line react/display-name
export const StoreDecorator = (state: DeepPartial<StateSchema>) => (story: () => Story) => (
    <StoreProvider initialState={state}>
        {story()}
    </StoreProvider>
)