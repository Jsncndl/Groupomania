import { ComponentStory, ComponentMeta } from "@storybook/react";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import { Button } from "./Button";

export default {
  title: "Nav/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Container = styled.div`
  width: 50%;
`;

const Template: ComponentStory<typeof Button> = (args) => (
  <Container>
    <Button {...args} />
  </Container>
);

export const Login = Template.bind({});
Login.args = {
  label: "Connexion",
  name: "login",
  color: colors.primary,
};

export const Signup = Template.bind({});
Signup.args = {
  label: "Inscription",
  name: "signup",
  color: colors.primary,
};

export const Confirm = Template.bind({});
Confirm.args = {
  type: "submit",
  label: "Confirmer",
  name: "confirm",
};
