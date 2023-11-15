type BookApiInfo = {
  id: string
  volumeInfo: {
    title: string
    imageLinks: {
      thumbnail: string
    }
    authors: string[]
    publishedDate: string
  }
}

type BookInfo = {
  id: string
  title: string
  authors: string[]
  image: string
  publishedDate: string
  condition: 'undamaged' | 'damaged' | string // need to know how to remove this string
  status: 'free' | 'paid' | string
}

type StorageBookInfo = {
  id: string
  condition: 'undamaged' | 'damaged' | string // need to know how to remove this string
  borrower: string
  borrowed: boolean
  status?: 'free' | 'paid' | string
  borrowedAt?: Date | null
  returnedAt?: Date | null
}

type MergeBookInfo = {
  id: string
  title: string
  authors: string[]
  image: string
  description: string
  publishedDate: string
  condition: 'undamaged' | 'damaged' | string // need to know how to remove this string
  status: 'free' | 'paid' | string
  borrowed: boolean
}

type Condition = {
  id: 'undamaged' | 'undamaged' | string
  name: string
}
