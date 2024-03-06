import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AppLoaderLayout } from './AppLoaderLayout';

export default {
    title: 'unspecified/AppLoaderLayout',
    component: AppLoaderLayout,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppLoaderLayout>;

const Template: ComponentStory<typeof AppLoaderLayout> = (args) => (
    <AppLoaderLayout {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
