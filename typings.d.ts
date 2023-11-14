type BookInfo = {
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

type ParsedBookInfo = {
  id: string
  condition: 'undamaged' | 'damaged' | string // need to know how to remove this string
  borrower: string
  borrowed: boolean
  status?: 'free' | 'paid' | string
  borrowedAt?: Date | null
  returnedAt?: Date | null
}

type Condition = {
  id: 'undamaged' | 'undamaged' | string
  name: string
}
