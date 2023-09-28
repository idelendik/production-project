import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import MainPage from "./MainPage";

export default {
    title: "pages/MainPage",
    component: MainPage,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = (args) => <MainPage {...args} />;


export const MainLight = Template.bind({});
MainLight.args = {};
MainLight.decorators = [ThemeDecorator(Theme.LIGHT)];

export const MainDark = Template.bind({});
MainDark.args = {};
MainDark.decorators = [ThemeDecorator(Theme.DARK)];