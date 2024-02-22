import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Dropdown } from './Dropdown';

export default {
    title: 'shared/Popups/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 100 }}>
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
    <Dropdown {...args} />
);

export const PrimaryWithTextTriger = Template.bind({});
PrimaryWithTextTriger.args = {
    trigger: 'Trigger',
    items: [
        { content: 'Content 1' },
        { content: 'Content 2' },
        { content: 'Content 3' },
        { content: 'Content 4' },
    ],
};

export const OpenToBottonLeft = Template.bind({});
OpenToBottonLeft.args = {
    trigger: 'Trigger',
    items: [
        { content: 'Content 1' },
        { content: 'Content 2' },
        { content: 'Content 3' },
        { content: 'Content 4' },
    ],
    direction: 'bottom left',
};

export const OpenToTopRight = Template.bind({});
OpenToTopRight.args = {
    trigger: 'Trigger',
    items: [
        { content: 'Content 1' },
        { content: 'Content 2' },
        { content: 'Content 3' },
        { content: 'Content 4' },
    ],
    direction: 'top right',
};

export const OpenToTopLeft = Template.bind({});
OpenToTopLeft.args = {
    trigger: 'Trigger',
    items: [
        { content: 'Content 1' },
        { content: 'Content 2' },
        { content: 'Content 3' },
        { content: 'Content 4' },
    ],
    direction: 'top left',
};

export const PrimaryWithButtonTriger = Template.bind({});
PrimaryWithButtonTriger.args = {
    trigger: <span>123</span>,
    items: [
        { content: 'Content 1' },
        { content: 'Content 2' },
        { content: 'Content 3' },
        { content: 'Content 4' },
    ],
};

export const WithDisabledItems = Template.bind({});
WithDisabledItems.args = {
    trigger: 'Trigger',
    items: [
        { content: 'Content 1' },
        { content: 'Content 2', disabled: true },
        { content: 'Content 3', disabled: true },
        { content: 'Content 4' },
    ],
};

export const WithHrefs = Template.bind({});
WithHrefs.args = {
    trigger: 'Trigger',
    items: [
        { content: 'Content 1' },
        { content: 'Content href 2', href: '/test2' },
        { content: 'Content href 3', href: '/test3' },
        { content: 'Content 4' },
    ],
};
