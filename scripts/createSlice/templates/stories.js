const { capitalize } = require("../helpers");

module.exports = (componentType, componentName) => `import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import ${capitalize(componentName)} from ${`"./${capitalize(componentName)}"`};

export default {
    title: "${componentType}/${capitalize(componentName)}",
    component: ${capitalize(componentName)},
    argTypes: {
        backgroundColor: { control: "color" }
    }
} as ComponentMeta<typeof ${capitalize(componentName)}>;

const Template: ComponentStory<typeof ${capitalize(componentName)}> = (args) => <${capitalize(componentName)} {...args} />;

export const Primary = Template.bind({});
Primary.args = {};`;