import axios from "axios";
import { createContext, useEffect, useState } from "react";

// User Context used to fetch and store user infos
// Contain logicals functions same as backend

// Initialize defaults values of User Context
const defaultValue = {
  userDetails: {
    email: "",
    token: "",
    userId: "",
    userImage: "",
    firstName: "",
    lastName: "",
    isAdmin: false,
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
  // used to display auth error when user try to edit profile with wrong password
  ProfileError401: false,
  // used to redirect user on login page if his token expired
  expiredSession: false,
  // used to display error on signup, for example email was already use
  errorSignup: false,
  // used to display error on login, wrong email or password
  errorLogin: false,
  // used to display error page if server don't respond or get error
  error: false,
  // used to display loader during request
  isLoading: true,
};

export const UserContext = createContext(defaultValue);

export const UserProvider = (props: any) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    token: "",
    userId: "",
    userImage: "",
    firstName: "",
    lastName: "",
    isAdmin: false,
  });
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [isLocalstorageChecked, setIsLocalstorageChecked] = useState(false);
  const [isUserModified, setIsUserModified] = useState(false);
  const [ProfileError401, setProfileError401] = useState(false);
  const [expiredSession, setExpiredSession] = useState(false);
  const [errorSignup, setErrorSignup] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // When user log in, store user's info in localStorage
  // so when the page is refresh or user come back
  // this function check localStorage.
  // If there are user's info into localStorage
  // Save user's info into userDetails state
  // and set state userIsLoggedIn true
  const checkLocalstorage = () => {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr) {
      user = JSON.parse(userStr);
      setUserDetails(user);
      setUserIsLoggedIn(true);
    }
  };

  // Function to fetch & save user's info
  // If OK save response in userDetails state
  // If error 401 set expiredSession state true, because this function
  // has been called when user come back on the site to check if jsonwebtoken isn't expired
  // If other error set error state true
  const getProfile = async (token: string, userId: string) => {
    setIsLoading(true);
    await axios
      .get(process.env.REACT_APP_API_URL + "user/" + userId, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setUserDetails({ ...userDetails, ...res.data });
      })
      .catch((error) => {
        setIsLoading(false);
        error.response.status === 401
          ? setExpiredSession(true)
          : setError(true);
      });
  };

  //
  useEffect(() => {
    // ----------- PERSISTENT SESSION ----------- //
    // When user come back on the site and he was logged in last time
    // Check localStorage
    if (!isLocalstorageChecked) {
      checkLocalstorage();
      setIsLocalstorageChecked(true);
    }
    // If localSotrage contain user's info
    // Use getProfile function with token and user ID
    // If getProfile return OK save response in userDetails
    if (userIsLoggedIn && !expiredSession) {
      getProfile(userDetails.token, userDetails.userId);
      localStorage.setItem("user", JSON.stringify(userDetails));
    }
    // If getProfile function return error 401
    // Set expiredSession state true because the jsonwebtoken is expired
    // clear localStorage to redirect user to login
    if (expiredSession) {
      setUserIsLoggedIn(false);
      localStorage.clear();
      setExpiredSession(false);
    }
    // ----------- PERSISTENT SESSION ----------- //

    // If user edit his profile, need to refresh user info to get last modifications
    if (isUserModified) {
      setIsUserModified(false);
    }
  }, [
    isLocalstorageChecked,
    userDetails.userId,
    userIsLoggedIn,
    isUserModified,
    expiredSession,
  ]);
  // Warning because set dependancy on userDetails.[props] to avoid infinite loop cause by object
  // function getProfile isn't on dependancy array to avoid infinite loops

  // Login function, require email & password
  const loginHandler = async (email: string, password: string) => {
    setIsLoading(true);
    setErrorLogin(false);
    await axios
      .post(process.env.REACT_APP_API_URL + "user/login", { email, password })
      // If response OK, function will return all user's infos
      // Save all info in userDetails state and localStorage
      // set userIsLoggedIn true
      .then((response) => {
        setUserDetails(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setUserIsLoggedIn(true);
        setIsLoading(false);
      })
      // If function return an error set error state true
      // If error status 401 set errorLogin state true
      // to know the problem is wrong email or password
      .catch((error) => {
        !error.response.data && setError(true);
        error.response.status = 401 ? setErrorLogin(true) : setError(true);
        setIsLoading(false);
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
      isAdmin: false,
    });
    setUserIsLoggedIn(false);
    setIsLoading(true);
  };

  const signupHandler = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    setErrorSignup(false);
    axios
      .post(process.env.REACT_APP_API_URL + "user/signup", {
        firstName,
        lastName,
        email,
        password,
      })
      .then(() => {
        setErrorSignup(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        error.response.status === 400 ? setErrorSignup(true) : setError(true);
      });
  };

  // function called when user want to edit his profile
  // All modifications are send into FormData named newProfileValue
  const modifyProfile = async (newProfileValue: FormData) => {
    setIsLoading(true);
    setProfileError401(false);
    await axios
      .put(
        process.env.REACT_APP_API_URL + "user/" + userDetails.userId,
        newProfileValue,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + userDetails.token,
          },
        }
      )
      // If function return response OK, just set IsUserModified true
      // to execute useEffect and get new user's infos
      .then(() => {
        setIsUserModified(true);
        setIsLoading(false);
      })
      // If response was an error 401 set profileError401 true
      // to know the problem is wrong password
      // or set error state true
      .catch((error) => {
        setIsLoading(false);
        error.response.status === 401
          ? setProfileError401(true)
          : setError(true);
      });
  };

  const contextValue = {
    userDetails: userDetails,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    signup: signupHandler,
    modifyProfile: modifyProfile,
    isUserModified: isUserModified,
    ProfileError401: ProfileError401,
    expiredSession: expiredSession,
    errorSignup: errorSignup,
    errorLogin: errorLogin,
    error: error,
    isLoading: isLoading,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
