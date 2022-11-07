import { useEffect, useState } from "react";
import colors from "../../utils/style/colors";

import styled from "styled-components";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import { Button } from "../Button/Button";
import { NotificationModal } from "../../utils/hooks/modals/modals";
import { Alerts } from "../Alerts/Alerts";
import { validateMail, validateName } from "../../utils/regexp/regexp";

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

export const Signup: React.FC = () => {
  const UserCtx = useUserContext();
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState(false);
  const [validateMailError, setValidateMailError] = useState(false);
  const [validateFirstNameError, setValidateFirstNameError] = useState(false);
  const [validateLastNameError, setValidateLastNameError] = useState(false);
  const [successSignup, setSuccesSignup] = useState(false);

  const handleChange = (event: any) => {
    event.preventDefault();
    setFormError(false);
    setValidateFirstNameError(false);
    setValidateLastNameError(false);
    setValidateMailError(false);
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    setFormError(false);
    if (
      (formValue.firstName ||
        formValue.lastName ||
        formValue.email ||
        formValue.password) === ""
    ) {
      return setFormError(true);
    }

    if (!validateName(formValue.firstName)) {
      return setValidateFirstNameError(true);
    } else if (!validateName(formValue.lastName)) {
      return setValidateLastNameError(true);
    } else if (!validateMail(formValue.email)) {
      return setValidateMailError(true);
    } else {
      UserCtx.signup(
        formValue.firstName,
        formValue.lastName,
        formValue.email,
        formValue.password
      );
      if (!UserCtx.errorSignup) {
        setSuccesSignup(true);
      }
    }
  };

  return (
    <FormContainer>
      {formError ? (
        <>
          <LabelContainer htmlFor="firstName">Prénom</LabelContainer>
          <InputContainer
            name="firstName"
            type="text"
            onChange={handleChange}
            style={{ border: `inset 1px ${colors.primary}` }}
          />
          <LabelContainer htmlFor="lastName">Nom</LabelContainer>
          <InputContainer
            name="lastName"
            type="text"
            onChange={handleChange}
            style={{ border: `inset 1px ${colors.primary}` }}
          />
          <LabelContainer htmlFor="email">E-mail</LabelContainer>
          <InputContainer
            name="email"
            type="email"
            onChange={handleChange}
            style={{ border: `inset 1px ${colors.primary}` }}
          />
          <LabelContainer htmlFor="password">Mot de passe</LabelContainer>
          <InputContainer
            name="password"
            type="password"
            onChange={handleChange}
            style={{ border: `inset 1px ${colors.primary}` }}
          />
          <NotificationModal>
            <Alerts
              message={"Veuillez remplir tout les champs"}
              name={"warning"}
            />
          </NotificationModal>
        </>
      ) : (
        <>
          <LabelContainer htmlFor="firstName">Prénom</LabelContainer>
          <InputContainer
            name="firstName"
            type="text"
            onChange={handleChange}
          />
          <LabelContainer htmlFor="lastName">Nom</LabelContainer>
          <InputContainer name="lastName" type="text" onChange={handleChange} />
          <LabelContainer htmlFor="email">E-mail</LabelContainer>
          <InputContainer name="email" type="email" onChange={handleChange} />
          <LabelContainer htmlFor="password">Mot de passe</LabelContainer>
          <InputContainer
            name="password"
            type="password"
            onChange={handleChange}
          />
        </>
      )}

      <Button
        name="confirm"
        label="Confirmer"
        type="submit"
        onClick={onSubmit}
      />
      {validateFirstNameError ? (
        <NotificationModal>
          <Alerts message={"Vérifier votre prénom"} name={"warning"} />
        </NotificationModal>
      ) : null}
      {validateLastNameError ? (
        <NotificationModal>
          <Alerts message={"Vérifier votre nom"} name={"warning"} />
        </NotificationModal>
      ) : null}
      {validateMailError ? (
        <NotificationModal>
          <Alerts
            message={"Vérifier le format de votre email"}
            name={"warning"}
          />
        </NotificationModal>
      ) : null}
      {UserCtx.errorSignup ? (
        <NotificationModal>
          <Alerts
            message={"Réessayez avec une autre adresse e-mail"}
            name={"warning"}
          />
        </NotificationModal>
      ) : null}
      {successSignup ? (
        <NotificationModal>
          <Alerts message={"Vous pouvez vous connecter"} name={"success"} />
        </NotificationModal>
      ) : null}
    </FormContainer>
  );
};
