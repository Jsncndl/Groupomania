import { ComponentMeta, ComponentStory } from "@storybook/react";
import styled from "styled-components";
import { Login } from "./Login";

export default {
  title: "Landing/Login",
  component: Login,
} as ComponentMeta<typeof Login>;

const Container = styled.div`
  width: 50%;
  font-family: "Lato";
`;

const Template: ComponentStory<typeof Login> = (args) => (
  <Container>
    <Login {...args} />
  </Container>
);

export const LoginComponent = Template.bind({});
