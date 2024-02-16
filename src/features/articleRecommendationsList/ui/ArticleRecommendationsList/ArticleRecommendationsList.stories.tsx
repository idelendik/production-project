import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ArticleRecommendationsList } from "./ArticleRecommendationsList";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { Article } from "@/entities/Article";

export default {
    title: "features/ArticleRecommendationsList",
    component: ArticleRecommendationsList,
    argTypes: {
        backgroundColor: { control: "color" }
    },
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />;

const article: Article = {
    id: "1",
    img: "",
    createdAt: "",
    views: 123,
    user: { id: "1", username: "123" },
    blocks: [],
    type: [],
    title: "123",
    subtitle: "123 subtitle"
}

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
    StoreDecorator({
        articleDetailsPage: {
            recommendations: {
                ids: [1],
                entities: {
                    "1": { id: "1", title: "Title" }
                }
            }
        }
    })
]
Primary.parameters = {
    mockData: [
        {
            url: `${__API__}/articles?_limit=3`,
            method: "GET",
            status: 200,
            response: [
                { ...article, id: "1" },
                { ...article, id: "2" },
                { ...article, id: "3" }
            ]
        }
    ]
}