import { HTMLAttributes } from "react";
import styled from "styled-components";
import colors from "../../utils/style/colors";

const ButtonLogin = styled.button<{ color?: string }>`
  width: 50%;
  padding: 15px;
  border-radius: 20px 0 0;
  border: 0;
  background: white;
  font-size: 20px;
  cursor: pointer;
  border-top: ${({ color }) => `solid 2px ${color}`};
`;

const ButtonSignup = styled.button<{ color?: string }>`
  width: 50%;
  padding: 15px;
  border: 0;
  border-radius: 0 20px 0 0;
  font-size: 20px;
  background: white;
  border-top: ${({ color }) => `solid 2px ${color}`};
  cursor: pointer;
`;

const ButtonConfirm = styled.button`
  padding: 15px;
  width: 50%;
  border: 0px;
  border-radius: 50px;
  font-size: 16px;
  background-color: ${colors.primary};
  color: black;
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
  fontColor?: string;
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
