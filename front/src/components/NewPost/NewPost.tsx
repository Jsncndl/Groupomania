import { useState } from "react";
import { usePostContext } from "../../utils/hooks/usePostContext/usePostContext";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import colors from "../../utils/style/colors";
import { Button } from "../Button/Button";
import { Alerts } from "../Alerts/Alerts";
import { NotificationModal } from "../../utils/hooks/modals/modals";
import {
  Form,
  FormContainer,
  Input,
  InputUploadFile,
  Label,
  TextArea,
  UploadButton,
} from "../../utils/style/FormStyledComponents";

export const NewPost: React.FC = () => {
  const UserCtx = useUserContext();
  const PostCtx = usePostContext();

  const [formValue, setFormValue] = useState({
    title: "",
    message: "",
  });
  const [uploadFile, setUploadFile] = useState();
  const [uploadNotif, setUploadNotif] = useState(false);
  const [newPostNotif, setNewPostNotif] = useState(false);
  const [error, setError] = useState(false);

  const postFormData = new FormData();

  const handleChange = (event: any) => {
    setError(false);
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const onFileUpload = (event: any) => {
    const file = event.target.files[0];
    setUploadFile(file);
    setUploadNotif(true);
    setTimeout(() => setUploadNotif(false), 6000);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (formValue.title && formValue.message !== "") {
      if (uploadFile) {
        postFormData.append("image", uploadFile);
      }
      postFormData.append("userId", UserCtx.userDetails.userId);
      postFormData.append("userLastName", UserCtx.userDetails.lastName);
      postFormData.append("userFirstName", UserCtx.userDetails.firstName);
      postFormData.append("userImage", UserCtx.userDetails.userImage);
      postFormData.append("title", formValue.title);
      postFormData.append("message", formValue.message);
      PostCtx.newPost(postFormData);

      setFormValue({ title: "", message: "" });
      setUploadFile(undefined)
      setNewPostNotif(true);
      setTimeout(() => setNewPostNotif(false), 6000);
    } else {
      setError(true);
    }
  };

  return (
    <FormContainer>
      <Form id="NewPostForm" onSubmit={handleSubmit}>
        <Label htmlFor="title">Titre:</Label>
        {error ? (
          <Input
            id="title"
            onChange={handleChange}
            value={formValue.title}
            name="title"
            type="text"
            placeholder="Titre ..."
            color={colors.primary}
          />
        ) : (
          <Input
            id="title"
            onChange={handleChange}
            value={formValue.title}
            name="title"
            type="text"
            placeholder="Titre ..."
          />
        )}
        <Label htmlFor="message">Message:</Label>
        {error ? (
          <TextArea
            onChange={handleChange}
            value={formValue.message}
            name="message"
            id="message"
            placeholder="Votre message ..."
            color={colors.primary}
          />
        ) : (
          <TextArea
            onChange={handleChange}
            value={formValue.message}
            name="message"
            id="message"
            placeholder="Votre message ..."
          />
        )}
        <Label>Ajouter une image:</Label>
        <UploadButton>
          <InputUploadFile
            type="file"
            name="file"
            id="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(event) => onFileUpload(event)}
          />
          Choisir une image
        </UploadButton>
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
      {uploadNotif ? (
        <NotificationModal>
          <Alerts message={"Votre image à été ajouté"} name={"success"} />
        </NotificationModal>
      ) : null}
      {newPostNotif ? (
        <NotificationModal>
          <Alerts message={"Votre publication a été créée"} name={"success"} />
        </NotificationModal>
      ) : null}
      {error ? (
        <NotificationModal>
          <Alerts
            message={`Veuillez remplir les champs du formulaire`}
            name={"warning"}
          />
        </NotificationModal>
      ) : null}
    </FormContainer>
  );
};
