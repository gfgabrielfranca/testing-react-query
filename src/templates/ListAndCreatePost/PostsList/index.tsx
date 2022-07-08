import Link from "next/link";
import { IPosts } from "src/services/api/posts";

type PostsListProps = {
  isLoading: boolean;
  isError: boolean;
  posts?: IPosts[];
  fetchPosts: () => void;
};

export const PostsList = ({
  isLoading,
  isError,
  posts,
  fetchPosts,
}: PostsListProps) => {
  if (isLoading) {
    return <h4>Loading...</h4>;
  }

  if (isError) {
    return (
      <div>
        <h3>Error in request</h3>
        <button onClick={fetchPosts}>Try Again</button>
      </div>
    );
  }

  return (
    <>
      {posts?.map((post) => (
        <div key={post.id}>
          <Link href={`${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </div>
      ))}
    </>
  );
};
