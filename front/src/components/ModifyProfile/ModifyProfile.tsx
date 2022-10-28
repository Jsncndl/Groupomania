import { setDefaultResultOrder } from "dns";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { NotificationModal } from "../../utils/hooks/modals/modals";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import colors from "../../utils/style/colors";
import {
  Form,
  Input,
  InputUploadFile,
  Label,
  UploadButton,
} from "../../utils/style/FormStyledComponents";
import { Alerts } from "../Alerts/Alerts";
import { Button } from "../Button/Button";

/* const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const LabelContainer = styled.label`
  padding: 5px 5px;
`;

const InputContainer = styled.input`
  border-radius: 10px;
  border-width: 1px;
  border-color: ${colors.tertiary}
  `;

  const UploadButton = styled.label`
  text-align: center;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: ${colors.primary};
  color: white;
  width: fit-content;
  cursor: pointer;
`;

const InputUploadFile = styled.input`
  display: none;
`; */

export const ModifyProfile = () => {
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    password: "",
    newPassword: "",
  });

  const [uploadFile, setUploadFile] = useState();
  const [wantUploadFile, setWantUploadFile] = useState(false);
  const [confirmModify, setConfirmModify] = useState(false);
  const [wantEditPassword, setWantEditPassword] = useState(false);

  const user = useUserContext();

  useEffect(() => {
    setFormValue({
      ...formValue,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
    });
  }, [user.userDetails.firstName, user.userDetails.lastName]);
  const userFormData = new FormData();

  const onFileUpload = (event: any) => {
    setUploadFile(event.target.files[0]);
    setWantUploadFile(true);
    setTimeout(() => {
      setWantUploadFile(false);
    }, 6000);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (uploadFile) {
      userFormData.append("image", uploadFile);
    }
    if (formValue.newPassword) {
      userFormData.append("newPassword", formValue.newPassword);
    }
    if (formValue.firstName !== user.userDetails.firstName) {
      userFormData.append("firstName", formValue.firstName);
    }
    if (formValue.lastName !== user.userDetails.firstName) {
      userFormData.append("lastName", formValue.lastName);
    }
    if (formValue.password) {
      userFormData.append("confirmPassword", formValue.password);
    } else {
      user.ProfileError401 = true;
    }
    if (
      userFormData.get("firstName") ||
      userFormData.get("lastName") ||
      userFormData.get("newPassword")
    ) {
      user.modifyProfile(userFormData);
      user.ProfileError401 = false;
      setConfirmModify(true);
      setTimeout(() => {
        setConfirmModify(false);
      }, 6000);
    }
  };

  const handleChange = (event: any) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  return (
    <Form
      id="modifyForm"
      onSubmit={handleSubmit}
      style={{ alignItems: "center" }}>
      <Button
        name={"confirm"}
        type={"button"}
        label={"Changer votre mot de passe"}
        onClick={() => setWantEditPassword(true)}
      />
      {wantEditPassword ? (
        <>
          <Label htmlFor="newPassword">Changer le mot de passe</Label>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            onChange={handleChange}
          />
        </>
      ) : null}
      <Label htmlFor="file">Image de profil</Label>
      <UploadButton>
        <InputUploadFile
          type="file"
          name="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={(event) => onFileUpload(event)}
        />
        Choisir une image
      </UploadButton>
      <Label htmlFor="firstName">Prénom</Label>
      <Input
        id="firstName"
        name="firstName"
        value={formValue.firstName}
        onChange={handleChange}
      />
      <Label htmlFor="lastName">Nom</Label>
      <Input
        id="lastName"
        name="lastName"
        value={formValue.lastName}
        onChange={handleChange}
      />
      <Label htmlFor="password">Confirmez votre mot de passe</Label>
      {user.ProfileError401 ? (
        <Input
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          color={colors.primary}
        />
      ) : (
        <Input
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
        />
      )}
      <Button name={"confirm"} type={"submit"} label={"Confirmer"} />
      {wantUploadFile ? (
        <NotificationModal>
          <Alerts
            message={"Vous avez changé d'image de profil"}
            name={"success"}
          />
        </NotificationModal>
      ) : null}
      {confirmModify && !user.ProfileError401 ? (
        <NotificationModal>
          <Alerts message={"Vous avez modifié votre profil"} name={"success"} />
        </NotificationModal>
      ) : null}
      {user.ProfileError401 ? (
        <NotificationModal>
          <Alerts message={"Mot de passe incorrect"} name={"warning"} />
        </NotificationModal>
      ) : null}
    </Form>
  );
};
