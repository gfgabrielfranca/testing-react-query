import { faker } from "@faker-js/faker";
import { render, screen, userEvent } from "src/tests";
import { PostsList, PostsListProps } from ".";

function generateFakePosts(quantity: number) {
  return [...Array(quantity)].map(() => ({
    id: faker.datatype.number(),
    title: faker.random.words(2),
    content: faker.lorem.paragraph(),
  }));
}

function renderPostsList({
  fetchPosts = jest.fn(),
  isLoading = true,
  isError = true,
  posts = generateFakePosts(3),
}: Partial<PostsListProps> = {}) {
  return render(
    <PostsList
      fetchPosts={fetchPosts}
      isLoading={isLoading}
      isError={isError}
      posts={posts}
    />
  );
}

describe("<PostsList />", () => {
  it("should render loading", async () => {
    renderPostsList();

    expect(
      screen.getByRole("heading", {
        name: /loading/i,
        level: 4,
      })
    ).toBeInTheDocument();
  });

  it("should render error", async () => {
    renderPostsList({ isLoading: false });

    expect(
      screen.getByRole("heading", {
        name: /error in request/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /try again/i,
      })
    ).toBeInTheDocument();
  });

  it("should render post list", async () => {
    const fetchPosts = jest.fn();
    const posts = generateFakePosts(3);

    render(
      <PostsList
        fetchPosts={fetchPosts}
        isLoading={false}
        isError={false}
        posts={posts}
      />
    );

    posts.map((post) => {
      const link = screen.getByRole("link", {
        name: post.title,
      });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/${post.id}`);
    });
  });

  it("should render empty posts list", async () => {
    const { container } = renderPostsList({
      isLoading: false,
      isError: false,
      posts: [],
    });

    expect(container.firstChild).toMatchInlineSnapshot(`null`);
  });

  it("should handle try again click", async () => {
    const fetchPosts = jest.fn();
    const posts = generateFakePosts(3);

    render(
      <PostsList
        fetchPosts={fetchPosts}
        isLoading={false}
        isError={true}
        posts={posts}
      />
    );

    const tryAgainButton = screen.getByRole("button", {
      name: /try again/i,
    });

    expect(
      screen.getByRole("heading", {
        name: /error in request/i,
      })
    ).toBeInTheDocument();
    expect(tryAgainButton).toBeInTheDocument();

    await userEvent.click(tryAgainButton);

    expect(fetchPosts).toHaveBeenCalledTimes(1);
  });
});
