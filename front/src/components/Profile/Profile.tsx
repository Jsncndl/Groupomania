import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import colors from "../../utils/style/colors";
import { MainHeader } from "../MainHeader/MainHeader";

/* interface profileProps {
  userId: string;
  token: string;
  lastName: string;
  firstName: string;
  email: string;
  userImage: string;
}

const defaultProfileProps = {
  userId: "",
  token: "",
  lastName: "",
  firstName: "",
  email: "",
  userImage: "",
}; */

export const Profile: React.FC = () => {
  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });
  const [wantModify, setWantModify] = useState(false);
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
    setWantModify(false);
  };

  const handleButton = (event: any) => {
    setWantModify(true);
  };

  const handleChange = (event: any) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  ////////// CSS /////////
  const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
  `

  const ProfileCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0px 0px 8px ${colors.tertiary};
    gap: 10px;
    margin: 2% 0 0 0;
  `;

  const ProfileImageContainer = styled.div`
    border-radius: 100%;
    width: 250px;
    height: 250px;
    overflow: hidden;
  `

  const ProfileImage = styled.img`
    position: relative;
    width: 100%;
  `
  ///////// CSS //////////

  return (
    <>
      <MainHeader />
      <MainContainer>
        <ProfileCard>
          <ProfileImageContainer>
            <ProfileImage src={user.userDetails.userImage} alt="profil" />
          </ProfileImageContainer>
          <h1>
            {user.userDetails.firstName} {user.userDetails.lastName}
          </h1>
          <div>Vos coordonées: {user.userDetails.email}</div>
          <div id="modifyFormContainer">
            <button type="button" onClick={handleButton}>
              Modifier votre profil
            </button>
            {wantModify ? (
              <form id="modifyForm" onSubmit={handleSubmit}>
                <label htmlFor="firstName">Prénom</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={formValue.firstName}
                  onChange={handleChange}
                />
                <label htmlFor="lastName">Nom</label>
                <input
                  id="lastName"
                  name="lastName"
                  value={formValue.lastName}
                  onChange={handleChange}
                />
                <label htmlFor="file">Image de profil</label>
                <input
                  id="file"
                  type="file"
                  name="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={onFileUpload}
                />
                <label htmlFor="password">Mot de passe</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
                <input type="submit" value="Confirmer" />
              </form>
            ) : null}
          </div>
        </ProfileCard>
      </MainContainer>
    </>
  );
};
