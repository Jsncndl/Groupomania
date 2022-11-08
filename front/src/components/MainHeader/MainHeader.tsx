import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.svg";
import logoLogout from "../../assets/logout.svg";
import { NotificationModal } from "../../utils/hooks/modals/modals";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import colors from "../../utils/style/colors";
import { mediaQueries } from "../../utils/style/mediaQueries";
import { Confirmation } from "../Confirmation/Confirmation";

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 120px;
  margin: 0 0 50px;
  padding: 0 0 5px 0;
  box-shadow: 0 19px 8px 2px ${colors.tertiary};

  @media (min-width: ${mediaQueries.medium}) {
    flex-direction: row;
    justify-content: center;
    height: 70px;
    margin: 0;
    box-shadow: 0 0 0;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  min-height: 75px;
  overflow: hidden;
  background: white;
  display: flex;
  align-items: center;

  @media (min-width: ${mediaQueries.medium}) {
    min-height: 70px;
    height: 70px;
  }
`;

const LogoContainer = styled.img`
  width: 95%;
  max-height: 288px;

  @media (min-width: ${mediaQueries.medium}) {
    width: 60%;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: white;
  gap: 30%;
  min-height: 70px;

  @media (min-width: ${mediaQueries.medium}) {
    min-height: 60px;
    gap: 10%;
    justify-content: flex-end;
    padding: 5px 20px; 5px 5px ;
  }
  `;

const HelloContainer = styled.h1`
  display: none;

  @media (min-width: ${mediaQueries.large}) {
    display: block;
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-weight: normal;
  }
`;

const ProfileImageWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  max-width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 100%;
`;

const ProfileImageContainer = styled.img`
  height: 100%;
`;

const LogoLogoutContainer = styled.button`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: transform 200ms ease;
  &:hover,
  &:active {
    transform: scale(105%);
  }
`;

const LogoLogout = styled.img`
  width: 100%;
  opacity: 70%;
`;

type MainHeaderProps = {
  firstName: string;
  userImage: string;
  logout: () => void;
};

export const MainHeader = ({ ...props }: MainHeaderProps) => {
  const UserCtx = useUserContext();
  const [wantLogout, setWantLogout] = useState(false);

  const handleLogout = () => {
    setWantLogout(true);
  };

  return (
    <HeaderContainer role="header">
      <StyledLink to="/">
        <LogoContainer src={logo} alt="Logo" />
      </StyledLink>
      <NavContainer>
        <HelloContainer>Hello {props.firstName} !</HelloContainer>
        <ProfileImageWrapper to={"../user/" + UserCtx.userDetails.userId}>
          <ProfileImageContainer src={props.userImage} alt="Mon compte" />
        </ProfileImageWrapper>
        <LogoLogoutContainer onClick={handleLogout}>
          <LogoLogout src={logoLogout} alt="Déconnexion" />
        </LogoLogoutContainer>
      </NavContainer>
      {wantLogout ? (
        <NotificationModal>
          <Confirmation
            title={"Déconnexion"}
            message={"Vous allez vous déconnecter"}
            buttonLabel={"Déconnexion"}
            buttonNoOnClick={() => setWantLogout(false)}
            buttonYesOnClick={() => {
              localStorage.clear();
              UserCtx.logout();
            }}
          />
        </NotificationModal>
      ) : null}
    </HeaderContainer>
  );
};
