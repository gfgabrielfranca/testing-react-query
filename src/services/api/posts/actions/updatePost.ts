import { useMutation, useQueryClient } from "react-query";
import { IPosts, postKeys } from "src/services/api/posts";
import { client } from "src/services/api";

type UseUpdatePostParams = Pick<IPosts, "id">;
type UpdatePostParams = Omit<IPosts, "id">;

const useUpdatePost = ({ id }: UseUpdatePostParams) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (post: UpdatePostParams) => {
      return (await client.patch<IPosts[]>(`/posts/${id}`, post)).data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(postKeys.lists);
        return queryClient.invalidateQueries(postKeys.details({ id }));
      },
    }
  );
};

export { useUpdatePost };
