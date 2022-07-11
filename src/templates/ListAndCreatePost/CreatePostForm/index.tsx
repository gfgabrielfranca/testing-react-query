import { useForm } from "react-hook-form";
import { useCreatePost } from "src/services/api/posts";

export type FormData = {
  title: string;
  content: string;
};

export const CreatePostForm = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { isError, isLoading, mutate } = useCreatePost();

  function handleCreate(data: FormData) {
    mutate(data, {
      onSuccess: () => reset(),
    });
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
