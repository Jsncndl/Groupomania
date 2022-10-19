import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.svg";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  overflow: hidden;
  background-color: white;
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  width: 30%;
  justify-content: space-around;
`;

const LogoContainer = styled.img`
  min-height: 175px;
  min-width: 200px;
`;

const ProfileImageWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  overflow: hidden;
  border-radius: 100%;
  background-color: blue;
`;

const ProfileImageContainer = styled.img`
  height: 100%;
`;

const LogoutButton = styled.button`
  padding: 10px 15px;
  border: 0px;
  border-radius: 50px;
  background-color: #fd2d01;
  color: white;
`;

export const MainHeader = () => {

  const UserCtx = useUserContext()

  return (
    <HeaderContainer>
      <Link className="logo--container" to="/">
        <LogoContainer className="logo--img" src={logo} alt="Logo" />
      </Link>
      <NavContainer>
        <div>Hello {UserCtx.userDetails.firstName} !</div>
        <ProfileImageWrapper to={"../user/" + UserCtx.userDetails.userId}>
          <ProfileImageContainer src={UserCtx.userDetails.userImage} alt="Mon compte" />
        </ProfileImageWrapper>
        <LogoutButton
          name={"logout"}
          onClick={() => {
            localStorage.clear();
            UserCtx.logout()
          }}>
          Déconnexion
        </LogoutButton>
      </NavContainer>
    </HeaderContainer>
  );
};
