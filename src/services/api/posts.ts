import { client } from "./_client";

export interface IPosts {
  id: number;
  title: string;
  content: string;
}

export type GetPostParams = Pick<IPosts, "id">;

export async function getPost({ id }: GetPostParams) {
  const { data } = await client.get<IPosts>(`/posts/${id}`);
  return data;
}

export async function getPosts() {
  const { data } = await client.get<IPosts[]>(`/posts`);
  return data;
}

export type CreatePostParams = Pick<IPosts, "title" | "content">;

export async function createPost(post: CreatePostParams) {
  const { data } = await client.post<IPosts[]>(`/posts`, post);
  return data;
}

export type EditPostParams = {
  id: IPosts["id"];
  post: Omit<IPosts, "id">;
};

export async function editPost({ id, post }: EditPostParams) {
  const { data } = await client.patch<IPosts[]>(`/posts/${id}`, post);
  return data;
}

export type DeletePostParams = Pick<IPosts, "id">;

export async function deletePost({ id }: DeletePostParams) {
  await client.delete<IPosts[]>(`/posts/${id}`);
}
