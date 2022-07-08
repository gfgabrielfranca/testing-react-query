import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreatePost } from "src/services/api/posts";

export type FormData = {
  title: string;
  content: string;
};

type CreatePostFormProps = {
  onCreatePost: () => void;
};

export const CreatePostForm = ({ onCreatePost }: CreatePostFormProps) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { isError, isLoading, createPost } = useCreatePost();

  async function handleCreate(data: FormData) {
    await createPost(data);
    onCreatePost();
    reset();
  }

  return (
    <div style={{ maxWidth: 300 }}>
      <h2>New Post</h2>
      <form
        onSubmit={handleSubmit(handleCreate)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <input
          {...register("title")}
          type="text"
          disabled={isLoading}
          placeholder="Title"
          required
        />
        <textarea
          {...register("content")}
          disabled={isLoading}
          placeholder="Content"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create"}
        </button>
      </form>
      {isError && <p style={{ color: "red" }}>Error when creating!</p>}
    </div>
  );
};
