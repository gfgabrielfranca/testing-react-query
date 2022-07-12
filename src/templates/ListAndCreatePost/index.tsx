import { NextPage } from "next";
import { useGetPosts } from "src/services/api/posts";
import { CreatePostForm } from "./CreatePostForm";
import { PostsList } from "./PostsList";

export const ListAndCreatePost: NextPage = () => {
  const { data, isError, isLoading, isFetching, refetch } = useGetPosts();

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <h2>Posts</h2>
        {!isLoading && isFetching && <h5>loading...</h5>}
      </div>

      <PostsList
        posts={data}
        isLoading={isLoading}
        isError={isError}
        fetchPosts={refetch}
      />

      <CreatePostForm />
    </div>
  );
};
