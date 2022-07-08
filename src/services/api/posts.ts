import { useCallback, useEffect, useState } from "react";
import { client } from "./_client";

export interface IPosts {
  id: number;
  title: string;
  content: string;
}

export type UsePostParams = Pick<IPosts, "id">;

export function usePost({ id }: UsePostParams) {
  const [post, setPost] = useState<IPosts>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  const fetchPost = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const { data } = await client.get<IPosts>(`/posts/${id}`);
      setPost(data);
    } catch {
      setIsError(true);
    }

    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return { post, isLoading, isError, fetchPost };
}

export function usePosts() {
  const [posts, setPosts] = useState<IPosts[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  async function fetchPosts() {
    setIsLoading(true);
    setIsError(false);

    try {
      const { data } = await client.get<IPosts[]>(`/posts`);
      setPosts(data);
    } catch {
      setIsError(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, isLoading, isError, fetchPosts };
}

export type CreatePostParams = Pick<IPosts, "title" | "content">;

export function useCreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function createPost(post: CreatePostParams) {
    setIsLoading(true);
    setIsError(false);

    try {
      await client.post<IPosts[]>(`/posts`, post);
    } catch {
      setIsError(true);
    }

    setIsLoading(false);
  }

  return { isError, isLoading, createPost };
}

export type EditPostParams = {
  id: IPosts["id"];
  post: Omit<IPosts, "id">;
};

export function useEditPost() {
  const [isLoading, setIsLoading] = useState(false);

  async function editPost({ id, post }: EditPostParams) {
    setIsLoading(true);

    await client.patch<IPosts[]>(`/posts/${id}`, post);

    setIsLoading(false);
  }

  return { isLoading, editPost };
}

export type DeletePostParams = Pick<IPosts, "id">;

export function useDeletePost() {
  const [isLoading, setIsLoading] = useState(false);

  async function deletePost({ id }: DeletePostParams) {
    setIsLoading(true);

    await client.delete<IPosts[]>(`/posts/${id}`);

    setIsLoading(false);
  }

  return { isLoading, deletePost };
}
