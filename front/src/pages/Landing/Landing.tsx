import { useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import { Login } from "../../components/Login/Login";
import { Signup } from "../../components/Signup/Signup";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: fit-content;
  align-content: center;
  border-radius: 20px;
  box-shadow: inset 0px 0px 8px #ffd7d7;
  align-items: center;
  padding: 0px 0px 20px;
  margin: 13% auto;
  background-color: white;
`;

export const Landing: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <MainContainer>
      <nav>
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
        />
      </nav>
      {isSignup ? <Signup /> : <Login />}
    </MainContainer>
  );
};
