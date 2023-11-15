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

export const getAllTransactions = () => {
  const transactions = localStorage.getItem('book-transactions')

  if (typeof transactions === 'string') {
    return JSON.parse(transactions)
  }

  return []
}

export const addTransaction = (transaction: TransactionInfo) => {
  const transactions = getAllTransactions()

  const newTransactions = [...transactions, transaction]

  localStorage.setItem('book-transactions', JSON.stringify(newTransactions))

}
