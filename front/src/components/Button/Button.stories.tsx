import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./Button";



export default {
  title: "Nav/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Login = Template.bind({});
Login.args = {
  label: "Connexion",
  name: "login",
};

export const Signup = Template.bind({});
Signup.args = {
  type: "submit",
  label: "Inscription",
  name: "signup",
};

export const Confirm = Template.bind({});
Confirm.args = {
  type: "submit",
  label: "Confirmer",
  name: "confirm",
};

