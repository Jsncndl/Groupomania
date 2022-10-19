import { Link } from "react-router-dom";
import styled from "styled-components";
import { usePostContext } from "../../utils/hooks/usePostContext/usePostContext";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import colors from "../../utils/style/colors";
import { Button } from "../Button/Button";

interface PostProps {
  _id: string;
  index: number;
  date: Date;
  title: string;
  message: string;
  imageUrl?: string;
  userId: string;
  userLastName: string;
  userFirstName: string;
  userImage: string;
  likes: number;
  usersLiked?: [string];
}

const PostMainContainer = styled.div`
  background-color: white;
  border-radius: 15px;
  margin: 0 0 10px 0;
`;

const ProfileWrapper = styled.div`
  padding: 10px 25px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-bottom: solid 1px;
  border-color: ${colors.primary};
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  overflow: hidden;
  border-radius: 100%;
`;

const ProfileImageContainer = styled.img`
  height: 100%;
`;

const PostContainer = styled.div`
  padding: 0px 25px;
`;

const PostImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
  width: 100%;
  background-color: ${colors.tertiary};
`;

const PostImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const PostWrapper = ({
  _id,
  index,
  date,
  title,
  message,
  imageUrl,
  userId,
  userLastName,
  userFirstName,
  userImage,
  likes,
  usersLiked,
  ...props
}: PostProps) => {
  const currentUser = useUserContext().userDetails;
  const PostsCtx = usePostContext();

  const handleDeleteButton = (event: any) => {
    event.preventDefault();
    PostsCtx.deletePost(event.target.parentElement.getAttribute("data-id"));
  };

  const handleLike = (event: any) => {
    event.preventDefault();
    PostsCtx.likePost(event.target.parentElement.getAttribute("data-id"));
  };

  return (
    <PostMainContainer key={index} id={_id}>
      <ProfileWrapper>
        <ProfileImageWrapper>
          <ProfileImageContainer
            src={userImage}
            alt={`Profil de ${userFirstName}`}
          />
        </ProfileImageWrapper>
        <div>
          {userFirstName} {userLastName}
        </div>
        {userId === currentUser.userId ? (
          <div data-id={_id}>
            <Link to={`/post=${_id}`} >
            <button>Modifier</button>
            </Link>
            <button onClick={handleDeleteButton}>Supprimer</button>
          </div>
        ) : null}
      </ProfileWrapper>
      <PostContainer>
        <h2>{title}</h2>
        <div>{message}</div>
        {imageUrl ? (
          <PostImageWrapper>
            <PostImage src={imageUrl} alt={`Publication de ${userFirstName}`} />
          </PostImageWrapper>
        ) : null}

        <div>
          {date.toLocaleString("fr", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          ,{" "}
          {date.toLocaleString("fr", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div data-id={_id}>
          {likes} personnes aiment ce post.
          <input type="button" onClick={handleLike} value={"J'aime"} />
        </div>
      </PostContainer>
    </PostMainContainer>
  );
};
