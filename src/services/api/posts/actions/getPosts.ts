import { useQuery } from "react-query";
import { postKeys, IPosts } from "src/services/api/posts";
import { client } from "src/services/api";

const getPosts = async () => {
  return (await client.get<IPosts[]>(`/posts`)).data;
};

const getPostsQuery = {
  queryKey: postKeys.lists,
  queryFn: getPosts,
};

const useGetPosts = () => useQuery(getPostsQuery);

export { getPostsQuery, useGetPosts };
