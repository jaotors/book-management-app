export const getBooks = async (searchQuery: string | null) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GOOGLE_API_URL}?q=${searchQuery}`
  )
  const data = await res.json()

  return data
}
