import { create } from 'zustand'
import { getBooks, addBook } from '@/localStorage'

type BooksState = {
  books: StorageBookInfo[]
  getBooks: () => StorageBookInfo[] | []
  getBook: (id: string) => StorageBookInfo | undefined
  addBook: (book: StorageBookInfo) => void
  updateBook: () => void
}

const useBooksStore = create<BooksState>()((set, get) => ({
  books: [],
  getBooks: () => {
    const books = getBooks()

    set({ books })
    return books
  },
  getBook: (id: string) => {
    const books = get().books
    const book: StorageBookInfo | undefined = books.find(
      (book: { id: string }) => book.id === id
    )

    return book
  },
  addBook: (book) => {
    addBook(book)
    set({ books: [...get().books, book] })
  },
  updateBook: () => {},
}))

export default useBooksStore
