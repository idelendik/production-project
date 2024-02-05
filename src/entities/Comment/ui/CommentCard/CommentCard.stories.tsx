import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CommentCard } from "./CommentCard";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

export default {
    title: "entities/Comment/CommentCard",
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    comment: { user: { username: "admin", id: "1" }, id: "1", text: "hello" }
};
Primary.decorators = [
    StoreDecorator({})
]

export const IsLoading = Template.bind({});
IsLoading.args = {
    comment: { user: { username: "admin", id: "1" }, id: "1", text: "hello" },
    isLoading: true,
};
IsLoading.decorators = [
    StoreDecorator({})
]