import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { MainHeader } from "./MainHeader";

export default {
  title: "Nav/Header",
  component: MainHeader,
  parameters: {
    actions: {
      handles: ["click button"],
    },
  },
} as ComponentMeta<typeof MainHeader>;

const Template: ComponentStory<typeof MainHeader> = (args) => (
  <MemoryRouter>
    <MainHeader
      {...args}
    />
  </MemoryRouter>
);

export const HeaderComponent = Template.bind({});
HeaderComponent.args = {
  firstName: "Test",
  userImage: "http://localhost:3000/images/profile.png",
};
