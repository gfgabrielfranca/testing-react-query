import { useState } from "react";
import { useForm } from "react-hook-form";
import { createPost } from "src/services/api/posts";

export type FormData = {
  title: string;
  content: string;
};

type CreatePostFormProps = {
  onCreatePost: () => void;
};

export const CreatePostForm = ({ onCreatePost }: CreatePostFormProps) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [isCreating, setIsCreating] = useState(false);
  const [isError, setIsError] = useState(false);

  async function handleCreate(data: FormData) {
    setIsCreating(true);
    setIsError(false);

    try {
      await createPost(data);
      onCreatePost();
      reset();
    } catch {
      setIsError(true);
    }

    setIsCreating(false);
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
          disabled={isCreating}
          placeholder="Title"
          required
        />
        <textarea
          {...register("content")}
          disabled={isCreating}
          placeholder="Content"
          required
        />
        <button type="submit" disabled={isCreating}>
          {isCreating ? "Creating..." : "Create"}
        </button>
      </form>
      {isError && <p style={{ color: "red" }}>Error when creating!</p>}
    </div>
  );
};
