import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import AboutPage from "./AboutPage";

export default {
    title: "pages/AboutPage",
    component: AboutPage,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = () => <AboutPage />;

export const AboutLight = Template.bind({});
AboutLight.args = {};
AboutLight.decorators = [ThemeDecorator(Theme.LIGHT)];

export const AboutDark = Template.bind({});
AboutDark.args = {};
AboutDark.decorators = [ThemeDecorator(Theme.DARK)];