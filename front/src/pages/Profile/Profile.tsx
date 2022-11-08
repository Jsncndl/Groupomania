import { useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import colors from "../../utils/style/colors";
import { Button } from "../../components/Button/Button";
import { MainHeader } from "../../components/MainHeader/MainHeader";
import { ModifyProfile } from "../../components/ModifyProfile/ModifyProfile";
import { usePostContext } from "../../utils/hooks/usePostContext/usePostContext";
import { ErrorPage } from "../Error/Error";
import { Loader } from "../../components/Loader/Loader";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 0px 8px ${colors.tertiary};
  gap: 10px;
  margin: 2% 0;
`;

const ProfileImageContainer = styled.div`
  border-radius: 100%;
  width: 250px;
  height: 250px;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  position: relative;
  width: 100%;
`;

export const Profile: React.FC = () => {
  const [wantModify, setWantModify] = useState(false);

  const user = useUserContext().userDetails;
  const userError = useUserContext().error;
  const userIsLoading = useUserContext().isLoading;
  const postError = usePostContext().error;

  const handleButton = (event: any) => {
    event.preventDefault();
    wantModify ? setWantModify(false) : setWantModify(true);
  };

  return userError || postError ? (
    <ErrorPage />
  ) : (
    <>
      {userIsLoading && <Loader />}
      <MainHeader
        firstName={user.firstName}
        userImage={user.userImage}
        logout={() => {}}
      />
      <MainContainer>
        <ProfileCard>
          <ProfileImageContainer>
            <ProfileImage src={user.userImage} alt="profil" />
          </ProfileImageContainer>
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <div>Vos coordonnées: {user.email}</div>
          <div id="modifyFormContainer">
            <Button
              type="button"
              onClick={handleButton}
              name={"confirm"}
              label={"Modifier votre profil"}
              style={{ width: "100%" }}
            />
            {wantModify && <ModifyProfile />}
          </div>
        </ProfileCard>
      </MainContainer>
    </>
  );
};
