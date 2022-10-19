import { MainHeader } from "../../components/MainHeader/MainHeader";
import { NewPost } from "../../components/NewPost/NewPost";
import { Posts } from "../../components/Posts/Posts";

export const Home: React.FC = () => {

  return (
    <>
      <MainHeader />
      <NewPost />
      <Posts />
    </>
  );
};
