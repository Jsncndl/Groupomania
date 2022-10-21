import dayjs from "dayjs";
import locale from "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { usePostContext } from "../../utils/hooks/usePostContext/usePostContext";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import colors from "../../utils/style/colors";
import { Button } from "../Button/Button";
import logoDelete from "../../assets/delete.svg";
import logoEdit from "../../assets/edit.svg";
import logoLike from "../../assets/like.svg"

dayjs.extend(relativeTime);

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
  margin: 0 0 25px 0;
  box-shadow: 0px 0px 4px ${colors.tertiary};
`;

const ProfileWrapper = styled.div`
  padding: 10px 25px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
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

const PostDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  border-top: solid 1px ${colors.tertiary};
  font-size: 14px;
  color: ${colors.tertiary};
`;

const PostDate = styled.span`
  display: flex;
  font-style: italic;
  font-size: 14px;
  color: ${colors.tertiary};
  padding: 2px 0 0 5px;
`;

const ProfileNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PostMessageContainer = styled.div`
  padding: 0 0 10px 50px;
`;

const PostTitleContainer = styled.h2`
  padding: 0 0 10px 30px;
  margin: 20px 0;
`;

const ProfileButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ProfileMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

const LogoContainer = styled.button`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 100%;
  opacity: 70%;
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
    console.log(event.target.parentElement)
    PostsCtx.deletePost(event.target.parentElement.getAttribute("data-id"));
  };

  const handleLike = (event: any) => {
    event.preventDefault();
    PostsCtx.likePost(event.target.parentElement.getAttribute("data-id"));
  };

  return (
    <PostMainContainer key={index} id={_id}>
      <ProfileWrapper>
        <ProfileMainContainer>
          <ProfileImageWrapper>
            <ProfileImageContainer
              src={userImage}
              alt={`Profil de ${userFirstName}`}
            />
          </ProfileImageWrapper>
          <ProfileNameWrapper>
            {userFirstName} {userLastName},{" "}
            <PostDate>{dayjs(date).locale(locale).fromNow()}</PostDate>
          </ProfileNameWrapper>
        </ProfileMainContainer>
        {userId === currentUser.userId ? (
          <ProfileButtonContainer data-id={_id}>
            <Link to={`/post=${_id}`}>
              <LogoContainer>
                <Logo src={logoEdit} />
              </LogoContainer>
            </Link>
            <LogoContainer data-id={_id} onClick={handleDeleteButton}>
              <Logo src={logoDelete} />
            </LogoContainer>
          </ProfileButtonContainer>
        ) : null}
      </ProfileWrapper>
      <div>
        <PostTitleContainer>{title}</PostTitleContainer>
        <PostMessageContainer>{message}</PostMessageContainer>
        {imageUrl ? (
          <PostImageWrapper>
            <PostImage src={imageUrl} alt={`Publication de ${userFirstName}`} />
          </PostImageWrapper>
        ) : null}
        <PostDetailsWrapper data-id={_id}>
          {likes >= 2 ? (
            <span>{likes} personnes aiment cette publication.</span>
          ) : (
            <span>{likes} personne aime cette publication.</span>
          )}
          <LogoContainer data-id={_id} onClick={handleLike}>
            <Logo src={logoLike} />
          </LogoContainer>
        </PostDetailsWrapper>
      </div>
    </PostMainContainer>
  );
};
