import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/posts/")({
  component: RouteComponent,
  loader: async () => {
    return {
      posts: await getPosts(),
    };
  },
});

const getPosts = createServerFn({ method: "GET" }).handler(async () => {
  return [
    { id: "1", title: "Hello" },
    { id: "2", title: "World" },
  ];
});

function RouteComponent() {
  const { posts } = Route.useLoaderData();
  console.log({ posts });

  return <div>Hello "/posts/"!</div>;
}
