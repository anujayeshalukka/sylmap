/**
 * "New Search" request, sent from navigation (e.g. the homepage sidebar) to the unified search.
 * HeroSearch responds the same way as its existing Reset action: it clears the query and
 * result, then focuses the input.
 */
export const NEW_SEARCH_EVENT = "sylmap:new-search";

export function requestNewSearch() {
  window.dispatchEvent(new Event(NEW_SEARCH_EVENT));
}
