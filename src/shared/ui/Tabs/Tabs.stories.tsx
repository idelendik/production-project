import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Tabs } from "./Tabs";
import { action } from "@storybook/addon-actions";

export default {
    title: "shared/Tabs",
    component: Tabs,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    tabs: [
        { value: "Tab 1", content: "Content 1" },
        { value: "Tab 2", content: "Content 2" },
    ],
    value: "Tab 1",
    onTabClick: action("onTabClick")
};