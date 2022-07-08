import { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { IPosts, getPost } from "src/services/api/posts";
import { EditPostForm } from "./EditPostForm";

export type DetailsAndEditPostProps = {
  id: number;
};

export const DetailsAndEditPost: NextPage<DetailsAndEditPostProps> = ({
  id,
}) => {
  const [post, setPost] = useState<IPosts>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  const fetchPost = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const post = await getPost({ id });
      setPost(post);
    } catch {
      setIsError(true);
    }

    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

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
