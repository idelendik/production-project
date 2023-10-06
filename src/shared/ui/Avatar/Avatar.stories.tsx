import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Avatar } from "./Avatar";
import AvatarImg from "./Avatar.jpg";

export default {
    title: "shared/Avatar",
    component: Avatar,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    src: AvatarImg
};


export const PrimarySmaller = Template.bind({});
PrimarySmaller.args = {
    src: AvatarImg,
    size: 50,
};

export const PrimaryBigger = Template.bind({});
PrimaryBigger.args = {
    src: AvatarImg,
    size: 150,
};