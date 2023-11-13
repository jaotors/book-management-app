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
  status: 'free' | 'paid' | string
  borrower: string
  borrowed: boolean
  borrowedAt?: Date | null
  returnedAt?: Date | null
}
