import { useState } from "react";
import styled from "styled-components";
import { mediaQueries } from "../../utils/style/mediaQueries";
import { Button } from "../Button/Button";

type ConfirmationProps = {
  title: string;
  message: string;
  buttonLabel: string;
  buttonYesOnClick?: any;
  buttonNoOnClick?: any;
};

const MainContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(255, 215, 215, 0.9);
  z-index: 50;
  display: flex;
`;

const MessageContainer = styled.div`
  width: 80%;
  padding: 15px;
  margin: auto;
  background: white;
  border: 0;
  border-radius: 15px;
  box-shadow: 1px 1px 8px;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (min-width: ${mediaQueries.medium}) {
    width: 60%;
  }
`;

const Title = styled.h1`
  margin: 0 0 10px;
`;

const Text = styled.p`
  margin: 0 0 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  gap: 20px;
`;

export const Confirmation = ({
  title,
  message,
  buttonLabel,
  ...props
}: ConfirmationProps) => {

  return (
    <MainContainer id={"close"}>
      <MessageContainer id={"modalConfirm"}>
        <div>
          <Title>{title}</Title>
        </div>
        <Text>{message}</Text>
        <ButtonsContainer>
          <Button
            name={"confirm"}
            type={"button"}
            label={"Annuler"}
            onClick={props.buttonNoOnClick}
            style={{
              alignSelf: "end",
              width: "fit-content",
              padding: "10px 15px",
            }}
          />
          <Button
            name={"confirm"}
            type={"button"}
            label={buttonLabel}
            onClick={props.buttonYesOnClick}
            style={{
              alignSelf: "end",
              width: "fit-content",
              padding: "10px 15px",
            }}
          />
        </ButtonsContainer>
      </MessageContainer>
    </MainContainer>
  );
};
