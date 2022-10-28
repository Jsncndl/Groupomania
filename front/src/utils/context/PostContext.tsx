import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext/useUserContext";

const API_URL = "http://localhost:3000/api/";

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

  const getAllPosts = async () => {
    await axios
      .get(API_URL + "post/", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + user.userDetails.token,
        },
      })
      .then((res) => res.data.posts)
      .then(setPosts)
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (user.isLoggedIn || (user.isLoggedIn && hasModif)) {
      getAllPosts();
      setHasModif(false);
    }
  }, [hasModif, user.isLoggedIn, user.isUserModified]);

  const newPost = async (newPost: FormData) => {
    await axios
      .post(API_URL + "post/", newPost, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + user.userDetails.token,
        },
      })
      .then(() => setHasModif(true))
      .catch((error) => console.error(error));
  };

  const getPost = async (postId: string) => {
    await axios
      .get(API_URL + "post/" + postId, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + user.userDetails.token,
        },
      })
      .then((res) => {
        let data = res.data;
        setCurrentPost(data);
      })
      .catch((error) => console.error(error));
  };

  const deletePost = async (postId: string) => {
    await axios
      .delete(API_URL + "post/" + postId, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + user.userDetails.token,
        },
      })
      .then(() => setHasModif(true))
      .catch((error) => console.error(error));
  };

  // Attention suppression d'image ne s'enregistre pas lors de la confirmation
  const modifyPost = async (modifiedPost: FormData, postId: string) => {
    await axios
      .put(API_URL + "post/" + postId, modifiedPost, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + user.userDetails.token,
        },
      })
      .then(() => {
        setHasModif(true);
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  const likePost = async (postId: string) => {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + user.userDetails.token;
    await axios
      .put(API_URL + "post/like/" + postId, { like: 1 })
      .then(() => setHasModif(true))
      .catch((error) => console.error(error));
  };

  const contextValue = {
    posts: posts,
    currentPost: currentPost,
    newPost: newPost,
    getPost: getPost,
    deletePost: deletePost,
    modifyPost: modifyPost,
    likePost: likePost,
  };

  return (
    <PostContext.Provider value={contextValue}>
      {props.children}
    </PostContext.Provider>
  );
};
