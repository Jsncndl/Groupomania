import dayjs from "dayjs";
import locale from "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { usePostContext } from "../../utils/hooks/usePostContext/usePostContext";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import colors from "../../utils/style/colors";
import logoDelete from "../../assets/delete.svg";
import logoEdit from "../../assets/edit.svg";
import logoOnLike from "../../assets/likeOn.svg";
import logoOffLike from "../../assets/likeOff.svg";
import { NotificationModal } from "../../utils/hooks/modals/modals";
import { Confirmation } from "../Confirmation/Confirmation";
import { useState } from "react";
import { Alerts } from "../Alerts/Alerts";
import { ImageModal } from "../ImageModal/ImageModal";
import { mediaQueries } from "../../utils/style/mediaQueries";

dayjs.extend(relativeTime);

export interface PostProps {
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
  currentUserLiked?: boolean;
}

const PostMainContainer = styled.div`
  background-color: white;
  border-radius: 15px;
  margin: 0 0 15px 0;
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
  min-width: 50px;
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
  cursor: pointer;
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
  padding: 0 25px 10px 25px;

  @media (min-width: ${mediaQueries.medium}) {
    padding: 0 50px 10px 50px;
  }
`;

const PostTitleContainer = styled.h2`
  padding: 0 25px 0 25px;
  margin: 20px 0;

  @media (min-width: ${mediaQueries.medium}) {
    padding: 0 30px 10px 30px;
  }
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

const LogoOnLike = styled.img`
  color: blue;
  transition: transform 400ms ease;
  &:hover,
  &:active {
    transform: rotate(-360deg) scale(130%);
  }
`;

const Logo = styled.img`
  transition: transform 400ms ease;
  &:hover,
  &:active {
    transform: scale(130%);
  }
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
  currentUserLiked,
}: PostProps) => {
  const UserCtx = useUserContext();
  const PostsCtx = usePostContext();

  const [wantDelete, setWantDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [like, setLike] = useState(false);
  const [unLike, setUnlike] = useState(false);
  const [fullImage, setFullImage] = useState("");
  const [exitFullImage, setExitFullImage] = useState(false);

  const handleDeleteButton = (event: any) => {
    event.preventDefault();
    setWantDelete(true);
    setDeleteId(event.target.parentElement.getAttribute("data-id"));
  };

  const deletePost = () => {
    PostsCtx.deletePost(deleteId);
    setConfirmDelete(true);
    setTimeout(() => {
      setConfirmDelete(false);
    }, 6000);
  };

  const handleLike = (event: any) => {
    event.preventDefault();
    const name = event.target.getAttribute("data-name");
    if (name !== "like") {
      setLike(true);
      setUnlike(false);
    } else {
      setUnlike(true);
      setLike(false);
    }
    PostsCtx.likePost(_id);
  };

  return (
    <PostMainContainer key={index} id={_id}>
      {/* Header of post container, with author image, names, date */}
      <ProfileWrapper>
        <ProfileMainContainer>
          <ProfileImageWrapper>
            <ProfileImageContainer
              src={userImage}
              alt={`Profil de ${userFirstName}`}
            />
          </ProfileImageWrapper>
          <ProfileNameWrapper>
            {userFirstName} {userLastName}{" "}
            <PostDate>{dayjs(date).locale(locale).fromNow()}</PostDate>
          </ProfileNameWrapper>
        </ProfileMainContainer>

        {/* If user is the author of the post, or user is admin, display edit and delete buttons */}
        {userId === UserCtx.userDetails.userId ||
        UserCtx.userDetails.isAdmin ? (
          <ProfileButtonContainer data-id={_id}>
            <Link to={`/post=${_id}`}>
              <LogoContainer>
                <Logo src={logoEdit} alt="Modifier le post" />
              </LogoContainer>
            </Link>
            <LogoContainer data-id={_id} onClick={handleDeleteButton}>
              <Logo src={logoDelete} alt="Supprimer le post" />
            </LogoContainer>
          </ProfileButtonContainer>
        ) : null}
      </ProfileWrapper>

      {/* Post container to display title, message, eventually image if post contain image url */}
      <div>
        <PostTitleContainer>{title}</PostTitleContainer>
        <PostMessageContainer>{message}</PostMessageContainer>
        {imageUrl ? (
          <PostImageWrapper>
            <PostImage
              src={imageUrl}
              alt={`Publication de ${userFirstName}`}
              onClick={() => setFullImage(imageUrl)}
            />
          </PostImageWrapper>
        ) : null}

        {/* Details container with count of likes and like button
      If likes are up to 2 change spelling and conjugation */}
        <PostDetailsWrapper data-id={_id}>
          {likes >= 2 ? (
            <span>{likes} personnes aiment cette publication.</span>
          ) : (
            <span>{likes} personne aime cette publication.</span>
          )}
          {/* Change logo of like button if user like or ever like post */}
          <LogoContainer data-id={_id} onClick={handleLike}>
            {currentUserLiked ? (
              <LogoOnLike src={logoOnLike} data-name="like" alt={"J'aime"} />
            ) : (
              <Logo
                src={logoOffLike}
                data-name="unlike"
                alt={"Je n'aime plus"}
              />
            )}
          </LogoContainer>
        </PostDetailsWrapper>
      </div>

      {/* On click on delete button*/}
      {wantDelete ? (
        <NotificationModal>
          <Confirmation
            title={"Supprimer la publication ?"}
            message={"Vous allez supprimer définitivement votre publication."}
            buttonLabel={"Supprimer"}
            buttonYesOnClick={() => {
              deletePost();
              setWantDelete(false);
            }}
            buttonNoOnClick={() => setWantDelete(false)}
          />
        </NotificationModal>
      ) : null}

      {/* Alerts if user confirm delete */}
      {confirmDelete ? (
        <NotificationModal>
          <Alerts message={"Publication supprimée"} name={"success"} />
        </NotificationModal>
      ) : null}

      {/* Alerts if user like */}
      {like ? (
        <NotificationModal>
          <Alerts message={"Vous avez aimez la publication"} name={"success"} />
        </NotificationModal>
      ) : null}

      {/* Alerts if user unlike */}
      {unLike ? (
        <NotificationModal>
          <Alerts
            message={"Vous n'aimez plus la publication"}
            name={"success"}
          />
        </NotificationModal>
      ) : null}

      {/* If user click on image, modal appear to enlarge image */}
      {fullImage !== "" && !exitFullImage ? (
        <NotificationModal>
          <ImageModal
            src={fullImage}
            exitButton={() => {
              setExitFullImage(true);
              setFullImage("");
              setTimeout(() => {
                setExitFullImage(false);
              }, 500);
            }}
          />
        </NotificationModal>
      ) : null}
    </PostMainContainer>
  );
};
