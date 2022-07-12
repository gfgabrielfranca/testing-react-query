import { useMutation, useQueryClient } from "react-query";
import { IPosts, postKeys } from "src/services/api/posts";
import { client } from "src/services/api";

type CreatePostParams = Pick<IPosts, "title" | "content">;

const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (post: CreatePostParams) => {
      return (await client.post<IPosts[]>(`/posts`, post)).data;
    },
    { onSuccess: () => queryClient.invalidateQueries(postKeys.lists) }
  );
};

export { useCreatePost };
