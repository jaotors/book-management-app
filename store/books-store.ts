import { create } from 'zustand'
import { getBooks, addBook, getBook, updateBook } from '@/localStorage'
import { fetchBook } from '@/api/books'

type BooksState = {
  books: StorageBookInfo[] | []
  getBooks: () => StorageBookInfo[] | []
  getBook: (
    id: string,
    condition: string,
    status?: string
  ) => Promise<MergeBookInfo>
  addBook: (book: StorageBookInfo) => void
  checkoutBook: (
    id: string,
    data: {
      borrower: string
      status: string
      borrowed: boolean
      condition: string
      borrowedAt: Date
    }
  ) => void
  returnBook: (
    id: string,
    data: {
      condition: string
      returnedAt: Date
    }
  ) => void
}

const useBooksStore = create<BooksState>()((set, get) => ({
  books: [],
  getBooks: () => {
    const books = getBooks()

    set({ books })
    return books
  },
  getBook: async (id: string, condition, status) => {
    const books = get().getBooks()
    const apiBook = await fetchBook(id)

    const book: StorageBookInfo | undefined = books.find(
      (book: { id: string }) => book.id === id
    )

    if (!book) {
      const dataTobeAdded = {
        id,
        borrowed: false,
        borrower: '',
        status,
        condition,
      }

      get().addBook(dataTobeAdded)
      set({ books: [...get().books, dataTobeAdded] })
    }

    const mergedBook: MergeBookInfo = {
      id,
      title: apiBook.volumeInfo.title,
      authors: apiBook.volumeInfo.authors,
      image: apiBook.volumeInfo.imageLinks.medium,
      description: apiBook.volumeInfo.description,
      publishedDate: apiBook.volumeInfo.publishedDate,
      condition: book?.condition ?? condition,
      status: book?.status! ?? status,
      borrowed: book?.borrowed ?? false,
      borrower: book?.borrower ?? '',
    }

    return mergedBook
  },
  addBook: (book) => {
    addBook(book)
  },
  checkoutBook: (
    id: string,
    data: {
      borrower: string
      status: string
      borrowed: boolean
      condition: string
      borrowedAt: Date
    }
  ) => {
    const book = getBook(id)

    const updatedBook: StorageBookInfo = {
      id,
      ...book,
      ...data,
    }
    const updatedBooks = get().books.map((book: StorageBookInfo) => {
      if (id === book.id) {
        return updatedBook
      }
      return book
    })

    updateBook(updatedBook)
    set({ books: updatedBooks })
  },
  returnBook: (
    id: string,
    data: {
      condition: string
      returnedAt: Date
    }
  ) => {
    const book = getBook(id)

    const updatedBook: StorageBookInfo = {
      id,
      ...book,
      ...data,
      borrower: '',
      borrowed: false,
      borrowedAt: null,
    }

    const updatedBooks = get().books.map((book: StorageBookInfo) => {
      if (id === book.id) {
        return updatedBook
      }
      return book
    })

    updateBook(updatedBook)
    set({ books: updatedBooks })
  },
}))

export default useBooksStore
