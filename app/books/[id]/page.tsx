import Image from 'next/image'
import parse from 'html-react-parser'

import { fetchBook } from '@/api/books'

import BookActions from '@/components/BookActions'

import { ArrowLeftIcon } from '@heroicons/react/24/solid'

type Props = {
  params: {
    id: string
  }
}

const BookSummary = async ({ params: { id } }: Props) => {
  const data = await fetchBook(id)

  return (
    <div className='flex flex-col p-4'>
      <ArrowLeftIcon className='text-gray-500 h-8 w-8 mb-2' />
      <div className='relative w-1/2 mb-2'>
        <Image
          src={data.volumeInfo.imageLinks.medium}
          width={575}
          height={684}
          sizes='100%'
          alt={`Book Preview of ${data.title}`}
        />
      </div>
      <h2 className='text-2xl font-medium mb-2'>{data.volumeInfo.title}</h2>
      <div className='description mb-2'>
        {parse(data.volumeInfo.description)}
      </div>
      <p className='flex flex-col mb-2'>
        <span>Publish Year: {new Date(data.volumeInfo.publishedDate).getFullYear()}</span>
        <span>Author/s: {data.volumeInfo.authors.join(', ')}</span>
      </p>
      <BookActions id={id} status='fee' />
    </div>
  )
}

export default BookSummary
