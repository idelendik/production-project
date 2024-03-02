import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleListItemDeprecated } from './ArticleListItemDeprecated';

export default {
    title: 'unspecified/ArticleListItemDeprecated',
    component: ArticleListItemDeprecated,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleListItemDeprecated>;

const Template: ComponentStory<typeof ArticleListItemDeprecated> = (args) => (
    <ArticleListItemDeprecated {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
