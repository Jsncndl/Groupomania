import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { Landing } from "./Landing";

export default {
  title: "Nav/Landing",
  component: Landing,
} as ComponentMeta<typeof Landing>;

const Template: ComponentStory<typeof Landing> = (args) => (
  <MemoryRouter>
    <Landing {...args} />
  </MemoryRouter>
);

export const Signup = Template.bind({});

Signup.args = {};
