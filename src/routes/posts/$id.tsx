import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { z } from "zod";

const PostId = z.number({ message: "Invalid post id" });

export const Route = createFileRoute("/posts/$id")({
  component: RouteComponent,
  params: {
    parse: (rawParams) => {
      return {
        id: +rawParams.id,
      };
    },
  },
  loader: async ({ params }) => {
    return {
      post: await getPost({ data: params.id }),
    };
  },
  errorComponent: ({ error }) => {
    return <div>{error.message}</div>;
  },
});

const getPost = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    return PostId.parse(data);
  })
  .handler(async () => {
    return {
      id: 1,
      title: "Hello",
    };
  });

function RouteComponent() {
  const post = Route.useLoaderData();

  console.log(post);
  return <div>Hello "/posts/$id"!</div>;
}
