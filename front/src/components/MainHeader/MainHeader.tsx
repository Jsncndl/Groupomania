import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo.svg";
import logoLogout from "../../assets/logout.svg"
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
  width: fit-content;
  gap: 30px;
  justify-content: space-around;
  margin: 0 30px;
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
  min-height: 50px;
  max-height: 50px;
  height: 50px;
  min-width: 50px;
  max-width: 50px;
  overflow: hidden;
  border-radius: 100%;
  background-color: blue;
`;

const ProfileImageContainer = styled.img`
  height: 100%;
`;

const LogoLogoutContainer = styled.button`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: transform 500ms ease;
  &:hover{
    transform: scale(105%);
  }
`;

const LogoLogout = styled.img`
  width: 100%;
  opacity: 70%;
`;

export const MainHeader = () => {
  const UserCtx = useUserContext();

  const handleLogout = () => {
    localStorage.clear();
    UserCtx.logout();
  };

  return (
    <HeaderContainer>
      <Link className="logo--container" to="/">
        <LogoContainer className="logo--img" src={logo} alt="Logo" />
      </Link>
      <NavContainer>
        <div>Hello {UserCtx.userDetails.firstName} !</div>
        <ProfileImageWrapper to={"../user/" + UserCtx.userDetails.userId}>
          <ProfileImageContainer
            src={UserCtx.userDetails.userImage}
            alt="Mon compte"
          />
        </ProfileImageWrapper>
        <LogoLogoutContainer onClick={handleLogout}>
          <LogoLogout src={logoLogout} />
        </LogoLogoutContainer>
      </NavContainer>
    </HeaderContainer>
  );
};
