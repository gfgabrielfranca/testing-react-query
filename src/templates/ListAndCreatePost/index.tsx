import { NextPage } from "next";
import { usePosts } from "src/services/api/posts";
import { CreatePostForm } from "./CreatePostForm";
import { PostsList } from "./PostsList";

export const ListAndCreatePost: NextPage = () => {
  const { posts, isError, isLoading, fetchPosts } = usePosts();

  return (
    <div>
      <h2>Posts</h2>

      <PostsList
        posts={posts}
        isLoading={isLoading}
        isError={isError}
        fetchPosts={fetchPosts}
      />

      <CreatePostForm onCreatePost={fetchPosts} />
    </div>
  );
};
