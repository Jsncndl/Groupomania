import axios from "axios";
import { createContext, useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/";

// Définition des valeurs initials du contexte
const defaultValue = {
  userDetails: {
    email: "",
    token: "",
    userId: "",
    userImage: "",
    firstName: "",
    lastName: "",
  },
  isLoggedIn: false,
  login: (email: string, password: string) => {},
  logout: () => {},
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {},
  modifyProfile: (newProfileValue: FormData) => {},
  isUserModified: false,
};

// Création du contexte
export const UserContext = createContext(defaultValue);

// Création du provider
export const UserProvider = (props: any) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    token: "",
    userId: "",
    userImage: "",
    firstName: "",
    lastName: "",
  });
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [isLocalstorageChecked, setIsLocalstorageChecked] = useState(false);
  const [isUserModified, setIsUserModified] = useState(false);

  const checkLocalstorage = () => {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr) {
      user = JSON.parse(userStr);
      setUserDetails(user);
      setUserIsLoggedIn(true);
    }
  };

  useEffect(() => {
    // ----------- PERSISTENT SESSION ----------- //
    if (!isLocalstorageChecked) {
      checkLocalstorage();
      setIsLocalstorageChecked(true);
    }
    // ----------- PERSISTENT SESSION ----------- //

    const getProfile = async (token: string, userId: string) => {
      await axios
        .get(API_URL + "user/" + userId, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setUserDetails({ ...userDetails, ...res.data });
        })
        .catch((error) => console.log(error));
    };

    if (userIsLoggedIn) {
      getProfile(userDetails.token, userDetails.userId);
      localStorage.setItem("user", JSON.stringify(userDetails));
    }
    if (isUserModified) {
      setIsUserModified(false);
    }
  }, [
    isLocalstorageChecked,
    userDetails.userId,
    userIsLoggedIn,
    isUserModified,
  ]);
  // Erreur utile, dépendance sur userDetails.[props] pour évité boucle infini à cause d'un objet

  const loginHandler = async (email: string, password: string) => {
    await axios
      .post(API_URL + "user/login", { email, password })
      .then((response) => {
        setUserDetails(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setUserIsLoggedIn(true);
      })
      .catch((error) => {
        error.response.status = 401
          ? alert("Email ou mot de passe incorrect")
          : { error };
      });
  };

  const logoutHandler = () => {
    setUserDetails({
      email: "",
      token: "",
      userId: "",
      userImage: "",
      firstName: "",
      lastName: "",
    });
    setUserIsLoggedIn(false);
  };

  const signupHandler = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    axios
      .post(API_URL + "user/signup", {
        firstName,
        lastName,
        email,
        password,
      })
      .then((response) => alert(response.data.message))
      .catch((error) => alert(error));
  };

  const modifyProfile = async (newProfileValue: FormData) => {
    console.log(newProfileValue.get("image"))
    await axios
      .put(API_URL + "user/" + userDetails.userId, newProfileValue, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + userDetails.token,
        },
      })
      .catch((error) => console.error(error));
    setIsUserModified(true);
  };

  const contextValue = {
    userDetails: userDetails,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    signup: signupHandler,
    modifyProfile: modifyProfile,
    isUserModified: isUserModified 
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
