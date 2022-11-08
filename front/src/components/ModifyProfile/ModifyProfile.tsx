import { useEffect, useState } from "react";
import { NotificationModal } from "../../utils/hooks/modals/modals";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import { validateName } from "../../utils/regexp/regexp";
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

export const ModifyProfile = () => {
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    password: "",
    newPassword: "",
  });

  const [uploadFile, setUploadFile] = useState();
  const [confirmUploadFile, setConfirmUploadFile] = useState(false);
  const [confirmModify, setConfirmModify] = useState(false);
  const [wantEditPassword, setWantEditPassword] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const user = useUserContext();

  // Initialize form default value with first and last name in context //
  useEffect(() => {
    setFormValue({
      ...formValue,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.userDetails.firstName, user.userDetails.lastName, user.error]);

  const userFormData = new FormData();

  // Function when user add file, add file to the FormData //
  const onFileUpload = (event: any) => {
    setUploadFile(event.target.files[0]);
    setConfirmUploadFile(true);
    setTimeout(() => {
      setConfirmUploadFile(false);
    }, 6000);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // For formValue: firstName, lastName, password
    // Check if field isn't empty
    // or same has initial value to add it to FormData
    // If field is empty, return error in the following state

    if (formValue.firstName !== ("" || user.userDetails.firstName)) {
      userFormData.append("firstName", formValue.firstName);
    } else if (formValue.firstName === "") {
      return setFirstNameError(true);
    }

    if (formValue.lastName !== ("" || user.userDetails.lastName)) {
      userFormData.append("lastName", formValue.lastName);
    } else if (formValue.lastName === "") {
      setLastNameError(true);
    }

    if (formValue.password !== "") {
      userFormData.append("confirmPassword", formValue.password);
    } else {
      setPasswordError(true);
    }

    if (uploadFile) {
      userFormData.append("image", uploadFile);
    }
    if (formValue.newPassword) {
      userFormData.append("newPassword", formValue.newPassword);
    }

    // Check if userFormData and value of password isn't empty
    // to send request with userFormData
    if (userFormData !== null && formValue.password !== "") {
      if (formValue.firstName === "" || !validateName(formValue.firstName)) {
        return setFirstNameError(true);
      }
      if (formValue.lastName === "" || !validateName(formValue.lastName)) {
        return setLastNameError(true);
      }
      user.modifyProfile(userFormData);
      setConfirmModify(true);
      setTimeout(() => {
        setConfirmModify(false);
      }, 6000);
    }
  };

  const handleChange = (event: any) => {
    setLastNameError(false);
    setFirstNameError(false);
    setPasswordError(false);
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  return (
    <Form
      data-testid="modifyProfileForm"
      id="modifyForm"
      onSubmit={handleSubmit}
      style={{ alignItems: "center" }}>
      <Button
        data-testid="buttonNewPassword"
        name={"confirm"}
        type={"button"}
        label={"Changer votre mot de passe"}
        onClick={() => setWantEditPassword(true)}
      />
      {wantEditPassword ? (
        <>
          <Label htmlFor="newPassword">Changer le mot de passe</Label>
          <Input
            data-testid="newPasswordInput"
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
          data-testid="buttonUploadFile"
          type="file"
          name="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={(event) => onFileUpload(event)}
        />
        Choisir une image
      </UploadButton>
      <Label htmlFor="firstName">Prénom</Label>
      {firstNameError ? (
        <Input
          id="firstName"
          name="firstName"
          type="text"
          value={formValue.firstName}
          onChange={handleChange}
          color={colors.primary}
        />
      ) : (
        <Input
          data-testid="firstnameinput"
          id="firstName"
          name="firstName"
          type="text"
          value={formValue.firstName}
          onChange={handleChange}
        />
      )}
      <Label htmlFor="lastName">Nom</Label>
      {lastNameError ? (
        <Input
          id="lastName"
          name="lastName"
          value={formValue.lastName}
          onChange={handleChange}
          color={colors.primary}
        />
      ) : (
        <Input
          id="lastName"
          name="lastName"
          value={formValue.lastName}
          onChange={handleChange}
        />
      )}
      <Label htmlFor="password">Confirmez votre mot de passe</Label>
      {passwordError ? (
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
      {confirmUploadFile ? (
        <NotificationModal>
          <Alerts
            message={"Vous avez changé d'image de profil"}
            name={"success"}
          />
        </NotificationModal>
      ) : null}
      {firstNameError || lastNameError || passwordError ? (
        <NotificationModal>
          <Alerts
            message={
              "Vérifier le format de vos noms, ou remplissez les champs vides"
            }
            name={"warning"}
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
