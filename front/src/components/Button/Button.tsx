import { HTMLAttributes } from "react";
import styled from "styled-components";
import colors from "../../utils/style/colors";

import "./button.css";

const ButtonLogin = styled.button`
  padding: 20px 70px;
  border: 0;
  border-radius: 20px 0 0 0;
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  box-shadow: inset 1px 1px 2px ${colors.secondary};
  background-color: white;
  cursor: pointer;
  &:active {
    color: ${colors.primary};
  }
`;

const ButtonSignup = styled.button`
  padding: 20px 70px;
  border: 0;
  border-radius: 0 20px 0 0;
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  box-shadow: inset -1px 1px 2px ${colors.secondary};
  background-color: white;
  cursor: pointer;
  &:active {
    color: ${colors.primary};
  }
`;

const ButtonConfirm = styled.button`
  padding: 15px;
  width: 50%;
  border: 0px;
  border-radius: 50px;
  font-size: 16px;
  background-color: ${colors.primary};
  color: white;
  align-self: center;
  transition: transform 500ms ease;
  cursor: pointer;
  &:hover {
    transform: scale(105%);
  }
`;

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  name: "login" | "signup" | "confirm";
  type: "button" | "submit" | "reset" | undefined;
  label: string;
  value?: string;
}

export const Button = ({ name, label, ...props }: ButtonProps) => {
  if (name === "login") {
    return (
      <ButtonLogin name={name} {...props}>
        {label}
      </ButtonLogin>
    );
  } else if (name === "signup") {
    return (
      <ButtonSignup name={name} {...props}>
        {label}
      </ButtonSignup>
    );
  } else {
    return (
      <ButtonConfirm name={name} {...props}>
        {label}
      </ButtonConfirm>
    );
  }
};
