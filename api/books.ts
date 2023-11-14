export const fetchBooks = async (searchQuery: string | null) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}?q=${searchQuery}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
  )
  const data = await res.json()

  return data
}

export const fetchBook = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}/${id}?key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
  )
  const data = await res.json()

  return data
}
