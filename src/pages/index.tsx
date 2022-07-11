import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { fetchPosts } from "src/services/api/posts";
import { isFirstServerCall } from "src/utils/isFirstServerCall";
import { ListAndCreatePost } from "src/templates/ListAndCreatePost";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (isFirstServerCall(context)) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["posts"], fetchPosts);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }

  return { props: {} };
};

export default ListAndCreatePost;
