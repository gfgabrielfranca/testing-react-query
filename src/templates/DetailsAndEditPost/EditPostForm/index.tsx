import { useRouter } from "next/router";
import { useState } from "react";
import { DefaultValues, useForm } from "react-hook-form";
import { useDeletePost, useUpdatePost } from "src/services/api/posts";

export type FormData = {
  title: string;
  content: string;
};

type EditPostFormProps = {
  postId: number;
  defaultValues?: DefaultValues<FormData>;
};

export const EditPostForm = ({
  postId: id,
  defaultValues,
}: EditPostFormProps) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>({ defaultValues });
  const editPost = useUpdatePost({ id });
  const deletePost = useDeletePost({ id });
  const [error, setError] = useState("");

  const isDisabled = deletePost.isLoading || editPost.isLoading;

  async function handleEdit(post: FormData) {
    setError("");
    editPost.mutate(post, {
      onError: () => setError("Error when saving!"),
    });
  }

  async function handleDelete() {
    setError("");

    deletePost.mutate(undefined, {
      onSuccess: () => router.push("/"),
      onError: () => setError("Error when deleting!"),
    });
  }

  return (
    <div style={{ maxWidth: 300 }}>
      <h2>Edit Post</h2>
      <form
        onSubmit={handleSubmit(handleEdit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <input
          {...register("title")}
          type="text"
          disabled={isDisabled}
          placeholder="Title"
          required
        />
        <textarea
          {...register("content")}
          disabled={isDisabled}
          placeholder="Content"
          required
        />
        <button type="submit" disabled={isDisabled}>
          {editPost.isLoading ? "Saving..." : "Save"}
        </button>
        <button type="button" disabled={isDisabled} onClick={handleDelete}>
          {deletePost.isLoading ? "Deleting..." : "Delete"}
        </button>
      </form>
      {!!error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
