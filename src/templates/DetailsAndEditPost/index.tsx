import { NextPage } from "next";
import Link from "next/link";
import { usePost } from "src/services/api/posts";
import { EditPostForm } from "./EditPostForm";

export type DetailsAndEditPostProps = {
  id: number;
};

export const DetailsAndEditPost: NextPage<DetailsAndEditPostProps> = ({
  id,
}) => {
  const { isLoading, isError, fetchPost, post } = usePost({ id });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return (
      <div>
        <h3>Error in request</h3>
        <button onClick={fetchPost}>Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <Link href="/">
        <a>Voltar para a listagem</a>
      </Link>

      <h2>{post?.title}</h2>
      <p style={{ maxWidth: 300, textAlign: "justify" }}>{post?.content}</p>

      <EditPostForm postId={id} onEditPost={fetchPost} defaultValues={post} />
    </div>
  );
};
