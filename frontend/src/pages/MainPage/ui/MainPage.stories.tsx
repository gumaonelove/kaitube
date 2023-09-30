import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import MainPage from './MainPage';

export default {
    title: 'pages/MainPage',
    component: MainPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MainPage>;

const Template: ComponentStory<typeof MainPage> = (args) => <MainPage {...(args as object)} />;

export const Primary = Template.bind({});
Primary.args = {};
