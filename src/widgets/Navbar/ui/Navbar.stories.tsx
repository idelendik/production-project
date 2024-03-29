import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Navbar } from './Navbar';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'widgets/Navbar',
    component: Navbar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];

export const LightAuthenticated = Template.bind({});
LightAuthenticated.args = {};
LightAuthenticated.decorators = [StoreDecorator({ user: { authData: {} } })];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];

export const DarkAuthenticated = Template.bind({});
DarkAuthenticated.args = {};
DarkAuthenticated.decorators = [
    StoreDecorator({ user: { authData: {} } }),
    ThemeDecorator(Theme.DARK),
];
