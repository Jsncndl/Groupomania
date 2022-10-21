import dayjs from "dayjs";
import styled from "styled-components";
import { usePostContext } from "../../utils/hooks/usePostContext/usePostContext";
import { PostWrapper } from "../PostWrapper/PostWrapper";

const MainContainer = styled.div`
  width: 60%;
  margin: auto;
  border-radius: 15px;
  overflox: hidden;
`;

export const Posts: React.FC = () => {
  const PostsCtx = usePostContext();

  PostsCtx.posts.sort((a, b) => {console.log(dayjs(a.date).unix() - dayjs(b.date).unix()); return dayjs(b.date).unix() - dayjs(a.date).unix()})
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