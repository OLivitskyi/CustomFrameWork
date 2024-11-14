/**
 * Filters items based on the current hash in the URL or a provided hash.
 *
 * @param {Array} items - List of items to filter.
 * @param {string} [hash=window.location.hash] - Optional hash to filter by. Defaults to current URL hash.
 * @returns {Array} - Filtered list of items.
 */
export function filter(items, hash = window.location.hash) {
  switch (hash) {
    case "#/active":
      return items.filter((item) => !item.completed);
    case "#/completed":
      return items.filter((item) => item.completed);
    default:
      return items;
  }
}
