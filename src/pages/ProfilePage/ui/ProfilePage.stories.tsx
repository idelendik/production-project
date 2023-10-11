import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Theme } from "app/providers/ThemeProvider";
import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator/ThemeDecorator";
import ProfilePage from "./ProfilePage";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { Country } from "entities/Country";
import AvatarImg from "shared/assets/tests/Avatar.jpg";
import { Currency } from "entities/Currency";

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
    StoreDecorator({
        profile: {
            form: {
                username: "admin",
                age: 30,
                country: Country.India,
                lastname: "D.",
                firstname: "Igor",
                city: "Minsk",
                avatar: AvatarImg,
                currency: Currency.CNY
            },
        },
    })
];

export const ProfileDark = Template.bind({});
ProfileDark.args = {};
ProfileDark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            form: {
                username: "admin",
                age: 30,
                country: Country.India,
                lastname: "D.",
                firstname: "Igor",
                city: "Minsk",
                avatar: AvatarImg,
                currency: Currency.CNY
            },
        },
    })
];

export const ProfileLightReadonly = Template.bind({});
ProfileLightReadonly.args = {};
ProfileLightReadonly.decorators = [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({
        profile: {
            form: {
                username: "admin",
                age: 30,
                country: Country.India,
                lastname: "D.",
                firstname: "Igor",
                city: "Minsk",
                avatar: AvatarImg,
                currency: Currency.CNY
            },
            readonly: true,
        },
    })
];

export const ProfileDarkReadonly = Template.bind({});
ProfileDarkReadonly.args = {};
ProfileDarkReadonly.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            form: {
                username: "admin",
                age: 30,
                country: Country.India,
                lastname: "D.",
                firstname: "Igor",
                city: "Minsk",
                avatar: AvatarImg,
                currency: Currency.CNY
            },
            readonly: true,
        },
    })
];