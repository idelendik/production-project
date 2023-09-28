import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { NotFoundPage } from "./NotFoundPage";

export default {
    title: "pages/NotFoundPage",
    component: NotFoundPage,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof NotFoundPage>;

const Template: ComponentStory<typeof NotFoundPage> = (args) => <NotFoundPage {...args} />;


export const NotFoundLight = Template.bind({});
NotFoundLight.args = {};
NotFoundLight.decorators = [ThemeDecorator(Theme.LIGHT)];

export const NotFoundDark = Template.bind({});
NotFoundDark.args = {};
NotFoundDark.decorators = [ThemeDecorator(Theme.DARK)];