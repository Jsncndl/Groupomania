import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import colors from "../../utils/style/colors";
import { Button } from "../Button/Button";
import { MainHeader } from "../MainHeader/MainHeader";
import { ModifyProfile } from "../ModifyProfile.tsx/ModifyProfile";

  ////////// CSS /////////
  const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
  `

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
  `

  const ProfileImage = styled.img`
    position: relative;
    width: 100%;
  `
  ///////// CSS //////////


/* interface profileProps {
  userId: string;
  token: string;
  lastName: string;
  firstName: string;
  email: string;
  userImage: string;
}

const defaultProfileProps = {
  userId: "",
  token: "",
  lastName: "",
  firstName: "",
  email: "",
  userImage: "",
}; */

export const Profile: React.FC = () => {
  const [wantModify, setWantModify] = useState(false);

  const user = useUserContext()

  const handleButton = (event: any) => {
    setWantModify(true);
  };

  return (
    <>
      <MainHeader />
      <MainContainer>
        <ProfileCard>
          <ProfileImageContainer>
            <ProfileImage src={user.userDetails.userImage} alt="profil" />
          </ProfileImageContainer>
          <h1>
            {user.userDetails.firstName} {user.userDetails.lastName}
          </h1>
          <div>Vos coordonées: {user.userDetails.email}</div>
          <div id="modifyFormContainer">
            <Button type="button" onClick={handleButton} name={"confirm"} label={"Modifier votre profil"} style={{width: "100%"}} />
            {wantModify ? (
              <ModifyProfile />
            ) : null}
          </div>
        </ProfileCard>
      </MainContainer>
    </>
  );
};
