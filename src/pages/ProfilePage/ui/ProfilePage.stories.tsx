import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import ProfilePage from "./ProfilePage";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";

export default {
    title: "pages/ProfilePage",
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;


export const ProfileLight = Template.bind({});
ProfileLight.args = {};
ProfileLight.decorators = [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({})
];

export const ProfileDark = Template.bind({});
ProfileDark.args = {};
ProfileDark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({})
];