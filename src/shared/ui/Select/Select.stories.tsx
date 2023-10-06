import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Select } from "./Select";

export default {
    title: "shared/Select",
    component: Select,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    options: [{ value: "1", content: "1" }, { value: "2", content: "2" }]
};


export const PrimaryWithLabel = Template.bind({});
PrimaryWithLabel.args = {
    label: "Label text",
    options: [{ value: "1", content: "1" }, { value: "2", content: "2" }]
};