import { useMutation, useQueryClient } from "react-query";
import { IPosts, postKeys } from "src/services/api/posts";
import { client } from "src/services/api";

type UseDeletePostParams = Pick<IPosts, "id">;

function useDeletePost({ id }: UseDeletePostParams) {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      return (await client.delete<IPosts[]>(`/posts/${id}`)).data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(postKeys.lists);
        return queryClient.removeQueries(postKeys.details({ id }));
      },
    }
  );
}

export { useDeletePost };
