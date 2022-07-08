import { useEffect, useState } from "react";
import { NextPage } from "next";
import { getPosts, IPosts } from "src/services/api/posts";
import { CreatePostForm } from "./CreatePostForm";
import { PostsList } from "./PostsList";

export const ListAndCreatePost: NextPage = () => {
  const [posts, setPosts] = useState<IPosts[]>();
  const [isListLoading, setIsListLoading] = useState(true);
  const [isListError, setIsListError] = useState(true);

  async function fetchPosts() {
    setIsListLoading(true);
    setIsListError(false);

    try {
      const posts = await getPosts();
      setPosts(posts);
    } catch {
      setIsListError(true);
    }
    setIsListLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts</h2>

      <PostsList
        posts={posts}
        isLoading={isListLoading}
        isError={isListError}
        fetchPosts={fetchPosts}
      />

      <CreatePostForm onCreatePost={fetchPosts} />
    </div>
  );
};
