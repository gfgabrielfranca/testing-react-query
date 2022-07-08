import { useState } from "react";
import { useQuery } from "react-query";
import { client } from "./_client";

export interface IPosts {
  id: number;
  title: string;
  content: string;
}

export type UsePostParams = Pick<IPosts, "id">;

export function usePost({ id }: UsePostParams) {
  return useQuery(["post", id], async () => {
    const { data } = await client.get<IPosts>(`/posts/${id}`);
    return data;
  });
}

export function usePosts() {
  return useQuery(["posts"], async () => {
    const { data } = await client.get<IPosts[]>(`/posts`);
    return data;
  });
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
