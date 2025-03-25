import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getPosts = createServerFn({ method: 'GET' }).handler(async () => {
  const posts = await prisma.post.findMany()

  return posts
})

export const Route = createFileRoute('/posts/')({
  component: RouteComponent,
  loader: async () => {
    const posts = await getPosts()

    return { posts }
  }
})

function RouteComponent() {
  const { posts } = Route.useLoaderData()
  const display = posts.length > 0 ? <DisplayPosts posts={posts} /> : 'No posts'

  return <div className='p-4 flex flex-col gap-3'>
    <Link
      className='w-fit px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80'
      to='/posts/new'
    >
      New Post
    </Link>
    {display}
  </div>
}

function DisplayPosts({ posts }: Readonly<{ posts: Awaited<ReturnType<typeof getPosts>> }>) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
  )
}
