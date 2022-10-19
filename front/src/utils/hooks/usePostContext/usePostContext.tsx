import { useContext } from "react";
import { PostContext } from "../../context/PostContext";

export const usePostContext = () => {
  // get the context
  const context = useContext(PostContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("usePostContext was used outside of its Provider");
  }

  return context;
};
