import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Theme } from "@/app/providers/ThemeProvider";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import MainPage from "./MainPage";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

export default {
    title: "pages/MainPage",
    component: MainPage,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = () => <MainPage />;

export const MainLight = Template.bind({});
MainLight.args = {};
MainLight.decorators = [
    StoreDecorator({}),
    ThemeDecorator(Theme.LIGHT)
];

export const MainDark = Template.bind({});
MainDark.args = {};
MainDark.decorators = [
    StoreDecorator({}),
    ThemeDecorator(Theme.DARK)
];