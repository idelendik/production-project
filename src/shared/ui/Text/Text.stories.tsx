import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Text, TextTheme } from "./Text";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";

export default {
    title: "shared/Text",
    component: Text,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Regular = Template.bind({});
Regular.args = {
    title: "Title",
    text: "Text",
};


export const RegularDark = Template.bind({});
RegularDark.args = {
    title: "Title",
    text: "Text",
};
RegularDark.decorators = [ThemeDecorator(Theme.DARK)];


export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: "Title",
};


export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
    title: "Title",
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];


export const OnlyText = Template.bind({});
OnlyText.args = {
    text: "Text",
};


export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
    text: "Text",
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];


export const Error = Template.bind({});
Error.args = {
    title: "Title",
    text: "Text",
    theme: TextTheme.ERROR,
};


export const ErrorDark = Template.bind({});
ErrorDark.args = {
    title: "Title",
    text: "Text",
    theme: TextTheme.ERROR,
};
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)];