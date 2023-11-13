import Image from 'next/image'

import { getBook } from '@/api/books'
import BookActions from '@/components/BookActions'

type Props = {
  params: {
    id: string
  }
}

const BookSummary = async ({ params: { id } }: Props) => {
  const data = await getBook(id)

  return (
    <div>
      <div>
        <div className='relative w-100'>
          <Image
            src={data.volumeInfo.imageLinks.medium}
            width={128}
            height={161}
            alt={`Book Preview of ${data.title}`}
          />
        </div>
        <h2>{data.volumeInfo.title}</h2>
        <p>{data.volumeInfo.description}</p>
        <p>
          {data.volumeInfo.publishedDate} - {data.volumeInfo.authors.join(', ')}
        </p>
        <BookActions status='fee' />
      </div>
    </div>
  )
}

export default BookSummary
