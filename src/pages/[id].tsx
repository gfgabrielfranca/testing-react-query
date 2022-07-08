import { GetServerSideProps } from "next";
import {
  DetailsAndEditPostProps,
  DetailsAndEditPost,
} from "src/templates/DetailsAndEditPost";

export const getServerSideProps: GetServerSideProps<
  DetailsAndEditPostProps
> = async (context) => {
  const id = Number(context.query.id);

  if (!id) return { notFound: true };

  return { props: { id } };
};

export default DetailsAndEditPost;
