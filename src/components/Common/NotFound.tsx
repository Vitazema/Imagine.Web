import ErrorModule from "./ErrorModule"

export default function PageNotFound() {
  return (
    <div>
      <h1>404</h1>
      <ErrorModule message="Page not found" />
    </div>
  )
}
