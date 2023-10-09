import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProfileCard } from "./ProfileCard";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import AvatarImg from "shared/assets/tests/Avatar.jpg";


export default {
    title: "entities/ProfileCard",
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        username: "admin",
        age: 30,
        country: Country.India,
        lastname: "D.",
        firstname: "Igor",
        city: "Minsk",
        avatar: AvatarImg,
        currency: Currency.CNY
    }
};

export const PrimaryWithError = Template.bind({});
PrimaryWithError.args = {
    error: "true"
}

export const PrimaryIsLoading = Template.bind({});
PrimaryIsLoading.args = {
    isLoading: true
}