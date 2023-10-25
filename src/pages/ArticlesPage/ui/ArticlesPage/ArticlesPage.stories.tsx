import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import ArticlesPage from "./ArticlesPage";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { ArticleView } from "entities/Article";

export default {
    title: "pages/ArticlesPage",
    component: ArticlesPage,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => <ArticlesPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
    StoreDecorator({
        articlesPage: {
            page: 1,
            view: ArticleView.BIG,
            hasMore: false,
            entities: {
                "1": { id: "1", views: 10, title: "Title 1", user: { id: "1", username: "U1" }, blocks: [], createdAt: "", type: [] },
                "2": { id: "2", views: 1, title: "Title 2", user: { id: "1", username: "U1" }, blocks: [], createdAt: "", type: [] }
            },
            ids: ["1", "2"],
            limit: 10,
            isLoading: false,
        },
    })
]