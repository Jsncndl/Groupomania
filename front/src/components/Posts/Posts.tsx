import styled from "styled-components";
import { usePostContext } from "../../utils/hooks/usePostContext/usePostContext";
import { PostWrapper } from "../PostWrapper/PostWrapper";

const MainContainer = styled.main`
  width: 60%;
  margin: auto;
  border-radius: 15px;
  overflox: hidden;
`;

export const Posts: React.FC = () => {
  const PostsCtx = usePostContext();

  return (
    <>
      {PostsCtx.posts.map((post, index) => {
        return (
          <MainContainer key={index}>
            <PostWrapper
              _id={post._id}
              index={index}
              date={post.date}
              title={post.title}
              message={post.message}
              userId={post.userId}
              userLastName={post.userLastName}
              userFirstName={post.userFirstName}
              userImage={post.userImage}
              likes={post.likes}
              imageUrl={post.imageUrl}
            />
          </MainContainer>
        );
      })}
    </>
  );
};