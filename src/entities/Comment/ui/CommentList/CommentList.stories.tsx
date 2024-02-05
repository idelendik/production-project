import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CommentList } from "./CommentList";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

export default {
    title: "entities/Comment/CommentList",
    component: CommentList,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    comments: [
        { id: "1", user: { id: "1", username: "admin" }, text: "asd" },
        { id: "2", user: { id: "2", username: "guest" }, text: "hello" }
    ]
};
Primary.decorators = [
    StoreDecorator({})
]

export const IsLoading = Template.bind({});
IsLoading.args = {
    comments: [],
    isLoading: true,
};
IsLoading.decorators = [
    StoreDecorator({})
]