import { QueryFunctionContext, useQuery } from "react-query";
import { postKeys, IPosts } from "src/services/api/posts";
import { client } from "src/services/api";

type GetPostParams = QueryFunctionContext<
  ReturnType<typeof postKeys["details"]>
>;

type QueryParams = Pick<IPosts, "id">;

const getPost = async ({ queryKey: [{ id }] }: GetPostParams) => {
  return (await client.get<IPosts>(`/posts/${id}`)).data;
};

const getPostQuery = ({ id }: QueryParams) => ({
  queryKey: postKeys.details({ id }),
  queryFn: getPost,
});

const useGetPost = (data: QueryParams) => useQuery(getPostQuery(data));

export { getPostQuery, useGetPost };
