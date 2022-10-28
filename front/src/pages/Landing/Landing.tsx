import { useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import { Login } from "../../components/Login/Login";
import { Signup } from "../../components/Signup/Signup";
import colors from "../../utils/style/colors";
import { mediaQueries } from "../../utils/style/mediaQueries";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const MainContainer = styled.main`
  background-color: white;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0px 0px 8px ${colors.tertiary};
  padding: 0 0 20px;
  width: 95%;
  @media (min-width: ${mediaQueries.medium}) {
    width: 60%;
  }
  @media (min-width: ${mediaQueries.large}) {
    width: 40%;
  }
`;

const Nav = styled.nav`
  width: 100%;
`;

export const Landing: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);

  return isSignup ? (
    <Wrapper>
      <MainContainer>
        <Nav>
          <Button
            name="login"
            label="Connexion"
            onClick={() => setIsSignup(false)}
            type="button"
          />
          <Button
            name="signup"
            label="Inscription"
            type="button"
            onClick={() => setIsSignup(true)}
            fontColor={colors.primary}
          />
        </Nav>
        <Signup />
      </MainContainer>
    </Wrapper>
  ) : (
    <Wrapper>
      <MainContainer>
        <Nav>
          <Button
            name="login"
            label="Connexion"
            onClick={() => setIsSignup(false)}
            type="button"
            fontColor={colors.primary}
          />
          <Button
            name="signup"
            label="Inscription"
            type="button"
            onClick={() => setIsSignup(true)}
          />
        </Nav>
        <Login />
      </MainContainer>
    </Wrapper>
  );
};
