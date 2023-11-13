export const getBooks = (): ParsedBookInfo[] | [] => {
  const books = localStorage.getItem('book-management')

  if (typeof books === 'string') {
    return JSON.parse(books)
  }

  return []
}

export const getBook = (id: string): ParsedBookInfo | undefined => {
  const books = getBooks()

  const book = books.find((book: { id: string }) => book.id === id)

  return book
}

export const addBook = (book: ParsedBookInfo): ParsedBookInfo[] => {
  const books = getBooks()

  const newBooks = [...books, book]

  localStorage.setItem('book-management', JSON.stringify(newBooks))

  return newBooks
}

export const updateBook = (book: ParsedBookInfo): ParsedBookInfo => {
  const books = getBooks()

  const toBeUpdatedBooks: ParsedBookInfo[] = [...books]

  const updatedIdx = toBeUpdatedBooks.findIndex(
    ({ id }: { id: string }) => book.id === id
  )

  toBeUpdatedBooks[updatedIdx] = {
    ...toBeUpdatedBooks[updatedIdx],
    ...book,
  }

  localStorage.setItem('book-management', JSON.stringify(toBeUpdatedBooks))

  return book
}
