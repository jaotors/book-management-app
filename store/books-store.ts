import { create } from 'zustand'
import { getBooks } from '@/localStorage'

type BooksState = {
  books: StorageBookInfo[]
  getBooks: () => StorageBookInfo[] | []
  getBook: (id: string) => StorageBookInfo | undefined
  addBook: () => void
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
  addBook: () => {},
  updateBook: () => {},
}))

export default useBooksStore
