import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { isFirstServerCall } from "src/utils/isFirstServerCall";
import { ListAndCreatePost } from "src/templates/ListAndCreatePost";
import { getPostsQuery } from "src/services/api/posts";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (isFirstServerCall(context)) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(getPostsQuery);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }

  return { props: {} };
};

export default ListAndCreatePost;
