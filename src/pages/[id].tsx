import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { getPostQuery } from "src/services/api/posts";
import {
  DetailsAndEditPostProps,
  DetailsAndEditPost,
} from "src/templates/DetailsAndEditPost";
import { isFirstServerCall } from "src/utils/isFirstServerCall";

export const getServerSideProps: GetServerSideProps<
  DetailsAndEditPostProps
> = async (context) => {
  const id = Number(context.query.id);

  if (!id) return { notFound: true };

  if (isFirstServerCall(context)) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(getPostQuery({ id }));

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        id,
      },
    };
  }

  return { props: { id } };
};

export default DetailsAndEditPost;
