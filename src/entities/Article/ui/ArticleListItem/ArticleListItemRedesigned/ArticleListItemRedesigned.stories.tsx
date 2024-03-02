import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleListItemRedesigned } from './ArticleListItemRedesigned';

export default {
    title: 'unspecified/ArticleListItemRedesigned',
    component: ArticleListItemRedesigned,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleListItemRedesigned>;

const Template: ComponentStory<typeof ArticleListItemRedesigned> = (args) => (
    <ArticleListItemRedesigned {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
