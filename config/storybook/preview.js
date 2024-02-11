import { addDecorator } from "@storybook/react";
import { StyleDecorator } from "../../src/shared/config/storybook/StyleDecorator/StyleDecorator";
import { ThemeDecorator } from "../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { RouteDecorator } from "../../src/shared/config/storybook/RouteDecorator/RouteDecorator";
import { SuspenseDecorator } from "../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator";
import { Theme } from "@/shared/const/theme";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    layout: "fullscreen",
    themes: {
        default: "normal",
        list: [
            { name: "normal", class: Theme.LIGHT, color: "#e8e8ea" },
            { name: "dark", class: Theme.DARK, color: "#090949" },
            { name: "orange", class: Theme.ORANGE, color: "#bd5012" }
        ]
    }
}

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouteDecorator);
addDecorator(SuspenseDecorator);