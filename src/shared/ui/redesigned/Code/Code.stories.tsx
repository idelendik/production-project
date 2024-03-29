import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Code } from './Code';

export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    text: `const a = 1;
const b = 2;
    
function sum(x, y) {
    return x + y;
}`,
};
