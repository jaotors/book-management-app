export const getBooks = (): StorageBookInfo[] | [] => {
  const books = localStorage.getItem('book-management')

  if (typeof books === 'string') {
    return JSON.parse(books)
  }

  return []
}

export const getBook = (id: string): StorageBookInfo | undefined => {
  const books = getBooks()

  const book = books.find((book: { id: string }) => book.id === id)

  return book
}

export const addBook = (book: StorageBookInfo): StorageBookInfo[] => {
  const books = getBooks()

  const newBooks = [...books, book]

  localStorage.setItem('book-management', JSON.stringify(newBooks))

  return newBooks
}

export const updateBook = (book: StorageBookInfo): StorageBookInfo => {
  const books = getBooks()

  const toBeUpdatedBooks: StorageBookInfo[] = [...books]

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
