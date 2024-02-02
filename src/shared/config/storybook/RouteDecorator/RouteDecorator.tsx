import { BrowserRouter } from "react-router-dom";
import { Story } from "@storybook/react";

export const RouteDecorator = (StoryComponent: Story) => {
    return (
        <BrowserRouter>
            <StoryComponent />
        </BrowserRouter>
    )
}