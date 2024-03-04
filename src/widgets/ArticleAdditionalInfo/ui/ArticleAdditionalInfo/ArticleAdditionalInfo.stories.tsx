import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleAdditionalInfo } from './ArticleAdditionalInfo';

export default {
    title: 'unspecified/ArticleAdditionalInfo',
    component: ArticleAdditionalInfo,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleAdditionalInfo>;

const Template: ComponentStory<typeof ArticleAdditionalInfo> = (args) => (
    <ArticleAdditionalInfo {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
