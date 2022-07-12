import { NextPage } from "next";
import Link from "next/link";
import { useGetPost } from "src/services/api/posts";
import { EditPostForm } from "./EditPostForm";

export type DetailsAndEditPostProps = {
  id: number;
};

export const DetailsAndEditPost: NextPage<DetailsAndEditPostProps> = ({
  id,
}) => {
  const { data, isLoading, isError, isFetching, refetch } = useGetPost({ id });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return (
      <div>
        <h3>Error in request</h3>
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <Link href="/">
        <a>Voltar para a listagem</a>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <h2>{data?.title}</h2>
        {isFetching && <h5>loading...</h5>}
      </div>

      <p style={{ maxWidth: 300, textAlign: "justify" }}>{data?.content}</p>

      <EditPostForm postId={id} defaultValues={data} />
    </div>
  );
};
