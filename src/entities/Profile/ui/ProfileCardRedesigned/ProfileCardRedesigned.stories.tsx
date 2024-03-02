import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ProfileCardRedesigned } from './ProfileCardRedesigned';

export default {
    title: 'unspecified/ProfileCardRedesigned',
    component: ProfileCardRedesigned,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCardRedesigned>;

const Template: ComponentStory<typeof ProfileCardRedesigned> = (args) => (
    <ProfileCardRedesigned {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
