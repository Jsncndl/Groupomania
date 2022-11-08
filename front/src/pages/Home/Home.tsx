import { Loader } from "../../components/Loader/Loader";
import { MainHeader } from "../../components/MainHeader/MainHeader";
import { NewPost } from "../../components/NewPost/NewPost";
import { Posts } from "../../components/Posts/Posts";
import { usePostContext } from "../../utils/hooks/usePostContext/usePostContext";
import { useUserContext } from "../../utils/hooks/useUserContext/useUserContext";
import { ErrorPage } from "../Error/Error";

export const Home: React.FC = () => {
  const user = useUserContext().userDetails;

  const userError = useUserContext().error;
  const postError = usePostContext().error;

  const userLoader = useUserContext().isLoading;
  const postLoader = usePostContext().isLoading;

  return userError || postError ? (
    <ErrorPage />
  ) : (
    <>
      {(userLoader || postLoader) && <Loader />}
      <MainHeader
        firstName={user.firstName}
        userImage={user.userImage}
        logout={() => {}}
      />
      <NewPost />
      <Posts />
    </>
  );
};
