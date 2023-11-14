'use client'

import Image from 'next/image'
import parse from 'html-react-parser'

import { fetchBook } from '@/api/books'

import BookActions from '@/components/BookActions'

import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Tags from '@/components/Tags'

type Props = {
  params: {
    id: string
  }
}

const BookSummary = async ({ params: { id } }: Props) => {
  const data = await fetchBook(id)

  return (
    <div className='flex flex-col p-4'>
      <button
        type='button'
        onClick={() => {
          console.log('test')
        }}
      >
        <ArrowLeftIcon className='text-gray-500 h-8 w-8 mb-2 cursor-pointer' />
      </button>
      <div className='relative w-1/2 mb-2 mx-auto'>
        <Image
          src={data.volumeInfo.imageLinks.medium}
          width={575}
          height={684}
          sizes='100%'
          alt={`Book Preview of ${data.title}`}
        />
      </div>
      <div className='flex justify-between mb-2 items-center'>
        <h2 className='text-2xl font-medium'>{data.volumeInfo.title}</h2>
        <BookActions id={id} status='fee' />
      </div>
      <div className='flex gap-1 mb-2'>
        <Tags name='Fee charged' important />
        <Tags name='Undamaged' />
      </div>
      <div className='description mb-2'>
        {parse(data.volumeInfo.description)}
      </div>
      <p className='flex flex-col mb-2'>
        <span>
          Publish Year: {new Date(data.volumeInfo.publishedDate).getFullYear()}
        </span>
        <span>Author/s: {data.volumeInfo.authors.join(', ')}</span>
      </p>
    </div>
  )
}

export default BookSummary
