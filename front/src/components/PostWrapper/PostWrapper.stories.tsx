import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PostWrapper } from "./PostWrapper";


export default {
  title: "PostWrapper",
  component: PostWrapper,
} as ComponentMeta<typeof PostWrapper>

const Template: ComponentStory<typeof PostWrapper> = (args) => <PostWrapper {...args} />

export const Post = Template.bind({})
const dateTest = new Date()
Post.args = {
  _id: "Test ID",
  index: 0,
  date: dateTest,
  title: "Titre de la publication",
  message: "Message de la publication",
  userId: "userIdTest",
  userLastName: "Doe",
  userFirstName: "John",
  userImage: "http://localhost:3000/images/profile.png",
  likes: 0,
}