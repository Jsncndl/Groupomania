import { useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import colors from "../../utils/style/colors";
import { Button } from "../Button/Button";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const LabelContainer = styled.label`
  padding: 5px 15px;
`;

const InputContainer = styled.input`
  padding: 5px 10px;
  width: 80%;
  align-self: center;
  margin: 0 0 20px 0;
`;

const ButtonContainer = styled.button`
  padding: 15px 50px;
  width: 50%;
  border: 0px;
  border-radius: 50px;
  font-size: 16px;
  background-color: ${colors.primary};
  color: white;
  transition: transform;
  transition-timing-function: ease;
  transition-duration: 500ms;
  align-self: center;
  &:hover {
    transform: scale(105%);
  }
`;

export const Login: React.FC = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const UserCtx = useUserContext();

  const handleChange = async (event: any) => {
    event.preventDefault();
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    UserCtx.login(formValue.email, formValue.password);
  };

  return (
    <FormContainer onSubmit={onSubmit}>
      <LabelContainer htmlFor="email">Email</LabelContainer>
      <InputContainer type="email" name="email" onChange={handleChange} />
      <LabelContainer htmlFor="password">Mot de passe</LabelContainer>
      <InputContainer type="password" name="password" onChange={handleChange} />
      <Button name="confirm" type="submit" label="Confirmer" />
    </FormContainer>
  );
};
