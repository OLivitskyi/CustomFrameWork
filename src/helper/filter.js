export function filter(items) {
  switch (window.location.hash) {
    case "#/active":
      return items.filter((item) => item.completed === false)
    case "#/completed":
      return items.filter((item) => item.completed === true)
    default:
      return items
  }
}
