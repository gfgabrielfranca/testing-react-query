import { useRouter } from "next/router";
import { useState } from "react";
import { DefaultValues, useForm } from "react-hook-form";
import { useDeletePost, useEditPost } from "src/services/api/posts";

export type FormData = {
  title: string;
  content: string;
};

type EditPostFormProps = {
  postId: number;
  onEditPost: () => void;
  defaultValues?: DefaultValues<FormData>;
};

export const EditPostForm = ({
  onEditPost,
  postId: id,
  defaultValues,
}: EditPostFormProps) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>({ defaultValues });
  const { editPost, ...editPostStatus } = useEditPost();
  const { deletePost, ...deletePostStatus } = useDeletePost();
  const [error, setError] = useState("");

  const isDisabled = deletePostStatus.isLoading || editPostStatus.isLoading;

  async function handleEdit(post: FormData) {
    setError("");

    try {
      await editPost({ id, post });
      onEditPost();
    } catch {
      setError("Error when saving!");
    }
  }

  async function handleDelete() {
    setError("");

    try {
      await deletePost({ id });
      router.push("/");
    } catch {
      setError("Error when deleting!");
    }
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
          {editPostStatus.isLoading ? "Saving..." : "Save"}
        </button>
        <button type="button" disabled={isDisabled} onClick={handleDelete}>
          {deletePostStatus.isLoading ? "Deleting..." : "Delete"}
        </button>
      </form>
      {!!error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
