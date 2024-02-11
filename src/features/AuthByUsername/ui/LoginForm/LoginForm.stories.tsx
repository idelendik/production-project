import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import LoginForm from "./LoginForm";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { Theme } from "@/shared/const/theme";

export default {
    title: "features/LoginForm",
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({
    loginForm: { username: "123", password: "asd" }
})];


export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ loginForm: { username: "123", password: "asd" } }),
];


export const Error = Template.bind({});
Error.args = {};
Error.decorators = [StoreDecorator({
    loginForm: { username: "123", password: "asd", error: "Error" }
})];


export const ErrorDark = Template.bind({});
ErrorDark.args = {};
ErrorDark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ loginForm: { username: "123", password: "asd", error: "Error" } })
];


export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [StoreDecorator({
    loginForm: { username: "123", password: "asd", isLoading: true }
})];


export const LoadingDark = Template.bind({});
LoadingDark.args = {};
LoadingDark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ loginForm: { username: "123", password: "asd", isLoading: true } })
];