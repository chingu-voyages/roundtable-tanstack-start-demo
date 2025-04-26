import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/demo/new"!</div>
}
