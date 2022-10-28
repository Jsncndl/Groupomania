import dayjs from "dayjs";
import styled from "styled-components";
import { usePostContext } from "../../utils/hooks/usePostContext/usePostContext";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import { mediaQueries } from "../../utils/style/mediaQueries";
import { PostWrapper } from "../PostWrapper/PostWrapper";

const MainContainer = styled.div`
  width: 95%;
  margin: auto;
  border-radius: 15px;
  overflox: hidden;

  @media (min-width: ${mediaQueries.large}) {
    width: 60%;
  }
`;

export const Posts: React.FC = () => {
  const PostsCtx = usePostContext();
  const currentUser = useUserContext().userDetails;

  PostsCtx.posts.sort((a, b) => {
    if(a.usersLiked?.includes(currentUser.userId)){
      a.currentUserLiked = true
    }
    return dayjs(b.date).unix() - dayjs(a.date).unix();
  });
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
              currentUserLiked={post.currentUserLiked}
            />
          </MainContainer>
        );
      })}
    </>
  );
};
