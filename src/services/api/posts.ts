import { useMutation, useQuery, useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();

  return useMutation(
    async (post: CreatePostParams) => {
      const { data } = await client.post<IPosts[]>(`/posts`, post);
      return data;
    },
    { onSuccess: () => queryClient.invalidateQueries(["posts"]) }
  );
}

export type UseEditPostParams = Pick<IPosts, "id">;
export type EditPostParams = Omit<IPosts, "id">;

export function useEditPost({ id }: UseEditPostParams) {
  const queryClient = useQueryClient();

  return useMutation(
    async (post: EditPostParams) => {
      const { data } = await client.patch<IPosts[]>(`/posts/${id}`, post);
      return data;
    },
    { onSuccess: () => queryClient.invalidateQueries(["post", id]) }
  );
}

export type UseDeletePostParams = Pick<IPosts, "id">;

export function useDeletePost({ id }: UseDeletePostParams) {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      const { data } = await client.delete<IPosts[]>(`/posts/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.removeQueries(["post", id]);
        return queryClient.invalidateQueries(["posts"]);
      },
    }
  );
}
