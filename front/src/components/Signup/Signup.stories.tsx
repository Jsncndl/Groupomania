import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Signup } from "./Signup";

export default {
  title: "Nav/Signup",
  component: Signup,
} as ComponentMeta<typeof Signup>;

const Template: ComponentStory<typeof Signup> = (args) => <Signup {...args} />;

export const SignupComponent = Template.bind({});
