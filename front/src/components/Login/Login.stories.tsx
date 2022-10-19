import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Login } from "./Login";

export default {
  title: "Nav/Login",
  component: Login,
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login {...args} />;

export const LoginComponent = Template.bind({});
