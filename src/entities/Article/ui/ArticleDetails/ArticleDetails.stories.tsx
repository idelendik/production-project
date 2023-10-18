import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ArticleDetails } from "./ArticleDetails";
import { StoreDecorator } from "shared/config/storybook/StoreDecorator/StoreDecorator";
import { Article, ArticleBlockType, ArticleType } from "entities/Article";

export default {
    title: "entities/ArticleDetails",
    component: ArticleDetails,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof ArticleDetails>;

const Template: ComponentStory<typeof ArticleDetails> = (args) => <ArticleDetails {...args} />;

const article: Article = {
    "id": "1",
    "title": "JS news",
    "subtitle": "What's new in 2023?",
    "img": "https://27sysday.ru/wp-content/uploads/2021/05/js_thumb.jpg",
    "views": 1022,
    "createdAt": "25.01.2022",
    "type": [ArticleType.IT],
    "blocks": [
        {
            "id": "1",
            "type": ArticleBlockType.TEXT,
            "title": "Block heading...",
            "paragraphs": [
                "This section is dedicated to the JavaScript language itself, and not the parts that are specific to Web pages or other host environments. For information about APIs that are specific to Web pages, please see Web APIs and DOM.",
                "The standards for JavaScript are the ECMAScript Language Specification (ECMA-262) and the ECMAScript Internationalization API specification (ECMA-402). As soon as one browser implements a feature, we try to document it. This means that cases where some proposals for new ECMAScript features have already been implemented in browsers, documentation and examples in MDN articles may use some of those new features. Most of the time, this happens between the stages 3 and 4, and is usually before the spec is officially published.",
                "Do not confuse JavaScript with the Java programming language — JavaScript is not \"Interpreted Java\". Both \"Java\" and \"JavaScript\" are trademarks or registered trademarks of Oracle in the U.S. and other countries. However, the two programming languages have very different syntax, semantics, and use."
            ]
        },
        {
            "id": "4",
            "type": ArticleBlockType.CODE,
            "code": "var a = 1;\nvar b = 2;"
        },
        {
            "id": "5",
            "type": ArticleBlockType.TEXT,
            "title": "Block heading1123...",
            "paragraphs": [
                "Lorem1333.....",
                "Lorem ipsum....",
                "3rd paragraph",
                "Lorem ipsumasd....",
                "333rd paragraph"
            ]
        },
        {
            "id": "2",
            "type": ArticleBlockType.IMAGE,
            "src": "https://cs13.pikabu.ru/post_img/2023/06/18/5/og_og_1687073811276818604.jpg",
            "title": "image title aasd"
        },
        {
            "id": "3",
            "type": ArticleBlockType.CODE,
            "code": "var a = 11;\nvar b = 22;"
        }
    ]
}

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
    StoreDecorator({
        articleDetails: {
            data: article
        }
    }),
]

export const IsLoading = Template.bind({});
IsLoading.args = {};
IsLoading.decorators = [
    StoreDecorator({
        articleDetails: {
            isLoading: true
        }
    }),
]

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [
    StoreDecorator({
        articleDetails: {
            error: "error"
        }
    }),
]