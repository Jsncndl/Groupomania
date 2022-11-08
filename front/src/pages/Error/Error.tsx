import styled from "styled-components";
import { Button } from "../../components/Button/Button";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10%;
`;

const MessageContainer = styled.span`
  margin: 0 0 20% 0;
`;

export const ErrorPage = () => {
  return (
    <Wrapper>
      <MainContainer>
        <MessageContainer>Une erreur est survenue ...</MessageContainer>
        <Button
          label={"Revenir à la page d'accueil"}
          onClick={() => {
            localStorage.clear();
            return window.location.reload();
          }}
          name={"confirm"}
          type={"button"}
          style={{ width: "fit-content" }}
        />
      </MainContainer>
    </Wrapper>
  );
};
