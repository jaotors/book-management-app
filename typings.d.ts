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
