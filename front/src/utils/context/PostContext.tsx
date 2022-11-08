import axios from "axios";
import dayjs from "dayjs";
import { createContext, useCallback, useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext/useUserContext";

// Post Context user to fetch and store posts infos
// Contains logicals functions same as backend

// Initialize defaults values of Post Context
const defaultValue = {
  posts: [
    {
      date: new Date(),
      imageUrl: "",
      likes: 0,
      message: "",
      title: "",
      userId: "",
      userFirstName: "",
      userLastName: "",
      userImage: "",
      usersLiked: [""],
      _id: "",
      currentUserLiked: false,
    },
  ],
  currentPost: {
    date: new Date(),
    imageUrl: "",
    likes: null,
    message: "",
    title: "",
    userId: "",
    userFirstName: "",
    userLastName: "",
    userImage: "",
    usersLiked: [],
    _id: "",
    currentUserLiked: false,
  },
  newPost: (newPost: FormData) => {},
  getPost: (postId: string) => {},
  deletePost: (postId: string) => {},
  modifyPost: (modifiedPost: FormData, postId: string) => {},
  likePost: (postId: string) => {},
  // error used to display error page if server don't respond or get an error
  error: false,
  // isLoading used to display loader during request
  isLoading: true,
};

export const PostContext = createContext(defaultValue);

export const PostContextProvider = (props: any) => {
  const user = useUserContext();
  const [posts, setPosts] = useState([
    {
      date: new Date(),
      imageUrl: "",
      likes: 0,
      message: "",
      title: "",
      userId: "",
      userFirstName: "",
      userLastName: "",
      userImage: "",
      usersLiked: [],
      _id: "",
      ...props,
    },
  ]);
  const [currentPost, setCurrentPost] = useState({
    date: new Date(),
    imageUrl: "",
    likes: null,
    message: "",
    title: "",
    userId: "",
    userFirstName: "",
    userLastName: "",
    userImage: "",
    usersLiked: [],
    _id: "",
    ...props,
  });

  const [hasModif, setHasModif] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch all posts, only need token of user
  const getAllPosts = useCallback(async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "post/", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + user.userDetails.token,
        },
      })
      // If response OK, posts array will be returned
      // Sort posts array by date, the most recent first
      // Save it in posts state
      .then((res) => {
        res.data.posts.sort((a: any, b: any) => {
          return dayjs(b.date).unix() - dayjs(a.date).unix();
        });
        setPosts(res.data.posts);
        setIsLoading(false);
      })
      // If error 401 will be returned if token is expired
      // set expiredSession true in userContext to redirect user on login and get new token
      // Else set error sate true
      .catch((error) => {
        error.response.status === 401
          ? (user.expiredSession = true)
          : setError(true);
        setIsLoading(false);
      });
  }, [user]);

  useEffect(() => {
    if (
      (user.isLoggedIn || (user.isLoggedIn && hasModif)) &&
      user.userDetails.token !== ("" || undefined)
    ) {
      getAllPosts();
      setHasModif(false);
    }
  }, [
    getAllPosts,
    hasModif,
    user.isLoggedIn,
    user.isUserModified,
    user.userDetails.token,
  ]);

  // Function to send new post, require all post info's in a FormData
  const newPost = async (newPost: FormData) => {
    setIsLoading(true);
    await axios
      .post(process.env.REACT_APP_API_URL + "post/", newPost, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + user.userDetails.token,
        },
      })
      // If response OK, hasModif state true to re-render through useEffect
      // so execute function getAllPost to be able to see new post
      .then(() => {
        setHasModif(true);
        setIsLoading(false);
      })
      // Else set error state true
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  };

  // Function to get only one post with is ID
  const getPost = async (postId: string) => {
    setIsLoading(true);
    await axios
      .get(process.env.REACT_APP_API_URL + "post/" + postId, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + user.userDetails.token,
        },
      })
      // If response OK, first save post's info into a variable
      // then put the variable into currentPost
      .then((res) => {
        let data = res.data;
        setCurrentPost(data);
        setIsLoading(false);
      })
      // Else set error state true
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  };

  // Function to delete post, require postId
  const deletePost = async (postId: string) => {
    setIsLoading(true);
    await axios
      .delete(process.env.REACT_APP_API_URL + "post/" + postId, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + user.userDetails.token,
        },
      })
      // If response OK, hasModif state true to refresh with useEffect
      .then(() => {
        setHasModif(true);
        setIsLoading(false);
      })
      // Else set error state true
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  };

  // Function to edit post, require new data into FormData named modifiedPost and post ID
  const modifyPost = async (modifiedPost: FormData, postId: string) => {
    setIsLoading(true);
    await axios
      .put(process.env.REACT_APP_API_URL + "post/" + postId, modifiedPost, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + user.userDetails.token,
        },
      })
      // If response OK, reload page to go to home page
      .then(() => {
        window.location.reload();
      })
      // Else set error state true
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  };

  // Function to like or unlike post, require post ID
  const likePost = async (postId: string) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + user.userDetails.token;
    await axios
      .put(process.env.REACT_APP_API_URL + "post/like/" + postId, { like: 1 })
      // If response OK set hasModif state true to call useEffect and get new data
      .then(() => {
        setHasModif(true);
      })
      // Else set error state true
      .catch(() => {
        setError(true);
      });
  };

  const contextValue = {
    posts: posts,
    currentPost: currentPost,
    newPost: newPost,
    getPost: getPost,
    deletePost: deletePost,
    modifyPost: modifyPost,
    likePost: likePost,
    error: error,
    isLoading: isLoading,
  };

  return (
    <PostContext.Provider value={contextValue}>
      {props.children}
    </PostContext.Provider>
  );
};
