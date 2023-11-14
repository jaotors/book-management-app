import Image from 'next/image'
import parse from 'html-react-parser'

import { fetchBook } from '@/api/books'

import BookActions from '@/components/BookActions'

type Props = {
  params: {
    id: string
  }
}

const BookSummary = async ({ params: { id } }: Props) => {
  const data = await fetchBook(id)

  return (
    <div className='flex flex-col p-4'>
      <div className='relative w-100 mb-2'>
        <Image
          src={data.volumeInfo.imageLinks.medium}
          width={128}
          height={161}
          alt={`Book Preview of ${data.title}`}
        />
      </div>
      <h2 className='text-2xl font-medium mb-2'>{data.volumeInfo.title}</h2>
      <div className='description mb-2'>{parse(data.volumeInfo.description)}</div>
      <p className='mb-2'>
        {data.volumeInfo.publishedDate} - {data.volumeInfo.authors.join(', ')}
      </p>
      <BookActions id={id} status='fee' />
    </div>
  )
}

export default BookSummary
