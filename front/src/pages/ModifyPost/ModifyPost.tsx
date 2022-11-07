import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { NotificationModal } from "../../utils/hooks/modals/modals";
import { usePostContext } from "../../utils/hooks/usePostContext/usePostContext";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import colors from "../../utils/style/colors";
import {
  Form,
  FormContainer,
  Input,
  InputUploadFile,
  Label,
  TextArea,
  UploadButton,
} from "../../utils/style/FormStyledComponents";
import { Alerts } from "../../components/Alerts/Alerts";
import { Button } from "../../components/Button/Button";
import { MainHeader } from "../../components/MainHeader/MainHeader";
import { Loader } from "../../components/Loader/Loader";
import { ErrorPage } from "../Error/Error";

const PostImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: center;
`;

const Image = styled.img`
  max-height: 300px;
  align-self: center;
`;

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
  const [uploadFile, setUploadFile] = useState();
  const [uploadNotif, setUploadNotif] = useState(false);
  const [deleteNotif, setDeleteNotif] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [wantDeleteImage, setWantDeleteImage] = useState("");

  useEffect(() => {
    if (paramValue) {
      PostCtx.getPost(paramValue);
    }
    setIsCurrentPost(true);
    if (isCurrentPost) {
      setFormValue({
        ...formValue,
        title: PostCtx.currentPost.title,
        message: PostCtx.currentPost.message,
      });
    }
  }, [PostCtx.currentPost._id]);

  const postFormData = new FormData();

  const handleChange = (event: any) => {
    setTitleError(false);
    setMessageError(false);
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const onFileUpload = (event: any) => {
    const file = event.target.files[0];
    setUploadFile(file);
    setUploadNotif(true);
    setTimeout(() => setUploadNotif(false), 6000);
  };

  const deleteFileUpload = (event: any) => {
    event.preventDefault();
    setWantDeleteImage(PostCtx.currentPost.imageUrl);
    setDeleteNotif(true);
    setTimeout(() => setDeleteNotif(false), 6000);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (formValue.title && formValue.message !== "") {
      if (uploadFile) {
        postFormData.append("image", uploadFile);
      }
      if (wantDeleteImage) {
        postFormData.set("deleteImage", wantDeleteImage);
      }
      postFormData.append("userId", UserCtx.userDetails.userId);
      postFormData.append("title", formValue.title);
      postFormData.append("message", formValue.message);
      PostCtx.modifyPost(postFormData, PostCtx.currentPost._id);
    } else if (formValue.title === "") {
      setTitleError(true);
    } else if (formValue.message === "") {
      setMessageError(true);
    }
  };

  return UserCtx.error || PostCtx.error ? (
    <ErrorPage />
  ) : (
    <main>
      {PostCtx.isLoading && <Loader />}
      <MainHeader />
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="title">Titre:</Label>
          {titleError ? (
            <Input
              onChange={handleChange}
              value={formValue.title}
              name="title"
              type="text"
              placeholder="Titre ..."
              color={colors.primary}
            />
          ) : (
            <Input
              onChange={handleChange}
              value={formValue.title}
              name="title"
              type="text"
              placeholder="Titre ..."
            />
          )}
          <Label htmlFor="message">Message:</Label>
          {messageError ? (
            <TextArea
              onChange={handleChange}
              value={formValue.message}
              name="message"
              placeholder="Votre message ..."
              color={colors.primary}
            />
          ) : (
            <TextArea
              onChange={handleChange}
              value={formValue.message}
              name="message"
              placeholder="Votre message ..."
            />
          )}
          <PostImageContainer id="postImageContainer">
            {PostCtx.currentPost.imageUrl ? (
              <div>
                <ImageContainer>
                  <Image src={PostCtx.currentPost.imageUrl} alt="Img du post" />
                </ImageContainer>
                <Button
                  onClick={deleteFileUpload}
                  name={"confirm"}
                  type={"button"}
                  label={"Supprimer l'image"}
                  style={{
                    margin: "10px 0 0 0",
                    width: "fit-content",
                    padding: "10px",
                  }}
                />
              </div>
            ) : null}
            <UploadButton>
              <InputUploadFile
                type="file"
                name="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={onFileUpload}
              />
              {PostCtx.currentPost.imageUrl
                ? "Remplacer l'image"
                : "Ajouter une image"}
            </UploadButton>
          </PostImageContainer>
          <Button
            name="confirm"
            type="submit"
            label={"Confirmer"}
            style={{
              alignSelf: "end",
              width: "fit-content",
              padding: "15px 30px",
            }}
          />
        </Form>
      </FormContainer>
      {titleError && (
        <NotificationModal>
          <Alerts message={"Le titre doit être renseigné"} name={"warning"} />
        </NotificationModal>
      )}
      {messageError && (
        <NotificationModal>
          <Alerts message={"Le message est nécéssaire"} name={"warning"} />
        </NotificationModal>
      )}
      {uploadNotif && (
        <NotificationModal>
          <Alerts message={"Votre image à été remplacée"} name={"success"} />
        </NotificationModal>
      )}
      {deleteNotif && (
        <NotificationModal>
          <Alerts message={"Votre image à été supprimée"} name={"success"} />
        </NotificationModal>
      )}
    </main>
  );
};
