import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { usePostContext } from "../../utils/hooks/usePostContext/usePostContext";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import colors from "../../utils/style/colors";
import { MainHeader } from "../MainHeader/MainHeader";

const NewPostContainer = styled.div`
  width: 60%;
  margin: 25px auto;
  background-color: white;
  border-radius: 15px;
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

const ConfirmButton = styled.button`
  padding: 15px 30px;
  width: fit-content;
  align-self: end;
  border-radius: 50px;
  border: 0px;
  background-color: ${colors.primary};
  color: white;
  font-size: 16px;
`;

const UploadButton = styled.label`
  text-align: center;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: ${colors.primary};
  color: white;
  width: fit-content;
`;

const InputUploadFile = styled.input`
  display: none;
`;

/////////////////////////////////////////CSS////////////////////////////////////////////

export const ModifyPost: React.FC = () => {
  const UserCtx = useUserContext();
  const PostCtx = usePostContext();

  const params = useParams();
  const paramValue = params.id;

  const [isCurrentPost, setIsCurrentPost] = useState(false);

  const [formValue, setFormValue] = useState({
    title: "",
    message: "",
  });

  let count = 0;

  useEffect(() => {
    if (paramValue) {
      PostCtx.getPost(paramValue);
    }
    setIsCurrentPost(true);
    if (isCurrentPost && count === 0) {
      count++;
      setFormValue({
        ...formValue,
        title: PostCtx.currentPost.title,
        message: PostCtx.currentPost.message,
      });
    }
  }, [PostCtx.currentPost._id]);

  const postFormData = new FormData();

  const handleChange = (event: any) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const onFileUpload = (event: any) => {
    const file = event.target.files[0];
    postFormData.set("image", file);
    alert("Votre image à été remplacé");
  };

  const deleteFileUpload = (event: any) => {
    event.preventDefault();
    const currentImageUrl = PostCtx.currentPost.imageUrl
    postFormData.set("deleteImage", currentImageUrl)
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(postFormData.get("image"))
    if (formValue) {
      postFormData.append("userId", UserCtx.userDetails.userId);
      postFormData.append("title", formValue.title);
      postFormData.append("message", formValue.message);
      PostCtx.modifyPost(postFormData, PostCtx.currentPost._id);
    }
  };

  return (
    <main>
      <MainHeader />
      <NewPostContainer>
        <FormContainer onSubmit={handleSubmit}>
          <LabelContainer htmlFor="title">Titre du post:</LabelContainer>
          <InputContainer
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
          <div id="postImageContainer">
          {PostCtx.currentPost.imageUrl ? (
            <div>
              <span>Image du post</span>
              <img src={PostCtx.currentPost.imageUrl} alt="Img du post" />
            </div>) : (null)}
            <LabelContainer htmlFor="file">
              {PostCtx.currentPost.imageUrl ? "Remplacer" : "Ajouter"} l'image:
            </LabelContainer>
            <UploadButton>
              <InputUploadFile
                type="file"
                name="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={onFileUpload}
              />
              {PostCtx.currentPost.imageUrl ? "Remplacer" : "Ajouter"} l'image
            </UploadButton>
            <ConfirmButton onClick={deleteFileUpload}>
              Supprimer l'image
            </ConfirmButton>
            <ConfirmButton name="confirm" type="submit">
              Confirmer
            </ConfirmButton>
          </div>
        </FormContainer>
      </NewPostContainer>
    </main>
  );
};
