import { getBook } from '@/api/books'

type Props = {
  params: {
    id: string
  }
}

const BookSummary = async ({ params: { id } }: Props) => {
  const data: BookInfo = await getBook(id)

  return <div>{id}</div>
}

export default BookSummary
