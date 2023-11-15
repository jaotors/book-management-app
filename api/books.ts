export const fetchBooks = async (searchQuery: string | null) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}?q=${searchQuery}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`,
    { cache: 'force-cache' }
  )

  if (!res.ok) {
    return new Error('Failed to fetch data')
  }

  return res.json()
}

export const fetchBook = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}/${id}?key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`,
    { cache: 'force-cache' }
  )

  if (!res.ok) {
    return new Error('Failed to fetch data')
  }

  return res.json()
}
