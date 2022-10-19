import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Posts } from "./Posts";

export default {
  title: "Nav/Post",
  component: Posts,
} as ComponentMeta<typeof Posts>;

const Template: ComponentStory<typeof Posts> = (args) => <Posts {...args} />;

export const PostsComponent = Template.bind({});
