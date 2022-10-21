import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import colors from "../../utils/style/colors";
import { Button } from "../Button/Button";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const LabelContainer = styled.label`
  padding: 5px 5px;
`;

const InputContainer = styled.input`
  border-radius: 15px;
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
`;


export const ModifyProfile = () => {
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });

  const [uploadFile, setUploadFile] = useState();

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
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (uploadFile) {
      userFormData.append("image", uploadFile);
    }
    userFormData.append("firstName", formValue.firstName);
    userFormData.append("lastName", formValue.lastName);
    userFormData.append("confirmPassword", formValue.password);
    user.modifyProfile(userFormData);
  };

  const handleChange = (event: any) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  return (
    <FormContainer id="modifyForm" onSubmit={handleSubmit}>
      <LabelContainer htmlFor="firstName">Prénom</LabelContainer>
      <InputContainer
        id="firstName"
        name="firstName"
        value={formValue.firstName}
        onChange={handleChange}
      />
      <LabelContainer htmlFor="lastName">Nom</LabelContainer>
      <InputContainer
        id="lastName"
        name="lastName"
        value={formValue.lastName}
        onChange={handleChange}
      />
      <LabelContainer htmlFor="file">Image de profil</LabelContainer>
      <UploadButton>
          <InputUploadFile
            type="file"
            name="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(event) => onFileUpload(event)}
          />
          Choisir une image
        </UploadButton>

      <LabelContainer htmlFor="password">Confirmez votre mot de passe</LabelContainer>
      <InputContainer
        id="password"
        type="password"
        name="password"
        onChange={handleChange}
      />
      <Button name={"confirm"} type={"submit"} label={"Confirmer"} style={{margin: "15px"}} />
    </FormContainer>
  );
};
