import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AppImage } from "./AppImage";

export default {
    title: "unspecified/AppImage",
    component: AppImage,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof AppImage>;

const Template: ComponentStory<typeof AppImage> = (args) => <AppImage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};