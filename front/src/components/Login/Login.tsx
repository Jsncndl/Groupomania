import { useState } from "react";
import styled from "styled-components";
import { NotificationModal } from "../../utils/hooks/modals/modals";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import { validateMail } from "../../utils/regexp/regexp";
import { Alerts } from "../Alerts/Alerts";
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

export const Login: React.FC = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [validateMailError, setValidateMailError] = useState(false);

  const UserCtx = useUserContext();

  const handleChange = async (event: any) => {
    event.preventDefault();
    setValidateMailError(false);
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (!validateMail(formValue.email)) {
      return setValidateMailError(true);
    }
    UserCtx.login(formValue.email, formValue.password);
  };

  return (
    <FormContainer onSubmit={onSubmit} role="login-form">
      <LabelContainer htmlFor="email">Email</LabelContainer>
      <InputContainer
      data-testid="emailInput"
        type="email"
        name="email"
        id="email"
        onChange={handleChange}
      />
      <LabelContainer htmlFor="password">Mot de passe</LabelContainer>
      <InputContainer
        type="password"
        name="password"
        id="password"
        onChange={handleChange}
      />
      <Button name="confirm" type="submit" label="Confirmer" />
      {validateMailError ? (
        <NotificationModal>
          <Alerts message={"Vérifier votre adress email"} name={"warning"} />
        </NotificationModal>
      ) : null}
      {UserCtx.errorLogin ? (
        <NotificationModal>
          <Alerts
            message={"Email ou mot de passe incorrect"}
            name={"warning"}
          />
        </NotificationModal>
      ) : null}
    </FormContainer>
  );
};
