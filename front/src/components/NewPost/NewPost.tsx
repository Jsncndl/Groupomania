import { useState } from "react";
import styled from "styled-components";
import { usePostContext } from "../../utils/hooks/usePostContext/usePostContext";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import colors from "../../utils/style/colors";
import { Button } from "../Button/Button";

const NewPostContainer = styled.div`
  width: 60%;
  margin: 25px auto;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 0px 4px ${colors.tertiary};
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 15px 3%;
  margin: auto;
`;

const LabelContainer = styled.label`
  padding: 0px 10px 5px;
`;

const InputContainer = styled.input`
  width: 80%;
  margin: 0px 0px 10px;
  padding: 5px;
`;

const TextareaContainer = styled.textarea`
  padding: 5px;
  min-width: 75%;
  max-width: 100%;
  min-height: 40%;
  max-height: 300px;
  font-family: Lato, sans-serif;
  margin: 0px 0px 10px;
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

/////////////////////////////////////////CSS////////////////////////////////////////////

export const NewPost: React.FC = () => {
  const UserCtx = useUserContext();
  const PostCtx = usePostContext();
  const [formValue, setFormValue] = useState({
    title: "",
    message: "",
  });

  const postFormData = new FormData();

  const handleChange = (event: any) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const onFileUpload = (event: any) => {
    const file = event.target.files[0];
    postFormData.set("image", file);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (formValue) {
      postFormData.append("userId", UserCtx.userDetails.userId);
      postFormData.append("userLastName", UserCtx.userDetails.lastName);
      postFormData.append("userFirstName", UserCtx.userDetails.firstName);
      postFormData.append("userImage", UserCtx.userDetails.userImage);
      postFormData.append("title", formValue.title);
      postFormData.append("message", formValue.message);
      PostCtx.newPost(postFormData);
    }
    setFormValue({title: "", message: ""})
  };

  return (
    <NewPostContainer>
      <FormContainer id="NewPostForm" onSubmit={handleSubmit}>
        <LabelContainer htmlFor="title">Titre du post:</LabelContainer>
        <InputContainer
          id="title"
          onChange={handleChange}
          value={formValue.title}
          name="title"
          type="text"
          placeholder="Titre ..."
        />
        <LabelContainer htmlFor="message">Message:</LabelContainer>
        <TextareaContainer
          onChange={handleChange}
          value={formValue.message}
          name="message"
          placeholder="Votre message ..."
        />
        <LabelContainer htmlFor="file">Ajouter une image:</LabelContainer>
        <UploadButton>
          <InputUploadFile
            type="file"
            name="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(event) => onFileUpload(event)}
          />
          Choisir une image
        </UploadButton>
        <Button name="confirm" type="submit" label={"Confirmer"} style={{alignSelf:"end", width:"fit-content", padding:"15px 30px"}} />
      </FormContainer>
    </NewPostContainer>
  );
};
