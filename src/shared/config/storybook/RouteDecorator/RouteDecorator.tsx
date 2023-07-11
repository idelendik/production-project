import { BrowserRouter } from "react-router-dom";
import { Story } from "@storybook/react";

export const RouteDecorator = (story: () => Story) => {
    return (
        <BrowserRouter>
            {story()}
        </BrowserRouter>
    )
}