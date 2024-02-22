import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ListBox } from './ListBox';

export default {
    title: 'shared/Popups/ListBox',
    component: ListBox,
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
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (props) => (
    <ListBox {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
    items: [
        { value: '1', content: 'SomecontentSomeContent1' },
        { value: '2', content: 'SomecontentSomeContent2' },
    ],
    value: 'Select a value',
    onChange: () => {},
};

export const OpenToBottomLeft = Template.bind({});
OpenToBottomLeft.args = {
    items: [
        { value: '1', content: 'SomecontentSomeContent1' },
        { value: '2', content: 'SomecontentSomeContent2' },
    ],
    value: 'Select a value',
    onChange: () => {},
    direction: 'bottom left',
};

export const OpenToTopRight = Template.bind({});
OpenToTopRight.args = {
    items: [
        { value: '1', content: 'SomecontentSomeContent1' },
        { value: '2', content: 'SomecontentSomeContent2' },
    ],
    value: 'Select a value',
    onChange: () => {},
    direction: 'top right',
};

export const OpenToTopLeft = Template.bind({});
OpenToTopLeft.args = {
    items: [
        { value: '1', content: 'SomecontentSomeContent1' },
        { value: '2', content: 'SomecontentSomeContent2' },
    ],
    value: 'Select a value',
    onChange: () => {},
    direction: 'top left',
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
    items: [
        { value: '1', content: '1' },
        { value: '2', content: '2' },
    ],
    value: 'Default value',
    onChange: () => {},
};

export const WithSelectedValue = Template.bind({});
WithSelectedValue.args = {
    items: [
        { value: '1', content: '1' },
        { value: '2', content: '2' },
    ],
    value: '2',
    onChange: () => {},
};

export const WithLabel = Template.bind({});
WithLabel.args = {
    items: [
        { value: '1', content: '1' },
        { value: '2', content: '2' },
    ],
    value: 'Select a value',
    onChange: () => {},
    label: 'Label>',
};

export const WithDisabledOptions = Template.bind({});
WithDisabledOptions.args = {
    items: [
        { value: '1', content: '1' },
        { value: '2', content: '2', disabled: true },
        { value: '3', content: '3', disabled: true },
        { value: '4', content: '4' },
    ],
    value: 'Select a value',
    onChange: () => {},
    label: 'Label>',
};

export const Readonly = Template.bind({});
Readonly.args = {
    items: [
        { value: '1', content: '1' },
        { value: '2', content: '2' },
    ],
    value: 'Select a value',
    onChange: () => {},
    label: 'Label>',
    readonly: true,
};
