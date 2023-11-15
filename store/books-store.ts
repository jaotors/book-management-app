import { create } from 'zustand'
import { getBooks, addBook } from '@/localStorage'

type BooksState = {
  getBooks: () => StorageBookInfo[] | []
  getBook: (id: string) => StorageBookInfo | undefined
  addBook: (book: StorageBookInfo) => void
  updateBook: () => void
}

const useBooksStore = create<BooksState>()((set, get) => ({
  getBooks: () => {
    const books = getBooks()

    return books
  },
  getBook: (id: string) => {
    const books = getBooks()
    const book: StorageBookInfo | undefined = books.find(
      (book: { id: string }) => book.id === id
    )

    return book
  },
  addBook: (book) => {
    addBook(book)
  },
  updateBook: () => {},
}))

export default useBooksStore
