import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NewPost } from "./NewPost";

export default {
  title: "Post/New Post",
  component: NewPost,
  parameters: {
    actions: {
      handles: ["click button"],
    },
  },
} as ComponentMeta<typeof NewPost>;

const Template: ComponentStory<typeof NewPost> = (args) => (
  <NewPost {...args} />
);

export const NewPostComponent = Template.bind({});
