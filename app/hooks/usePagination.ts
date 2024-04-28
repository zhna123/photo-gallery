
// Generate a sequence of numbers using array index
const getPages = (length: number, inc: number = 1) =>
  Array.from({ length }, (_, i) => i + inc)

export default function usePagination(
  totalPages: number,
  currentPage: number,
) {
  // -> 1 2 3 4 5 - display all page numbers
  if (totalPages <= 7) {
    return getPages(totalPages)
  }
  // -> 1 2 3 4 ... 9 10
  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // -> 1 2 ... 7 8 9 10
  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  // -> 1 ... 4 5 6 ... 10
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ]
}