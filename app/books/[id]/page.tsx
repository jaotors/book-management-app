'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import parse from 'html-react-parser'

import useBooksStore from '@/store/books-store'

import BookActions from '@/components/BookActions'
import Tags from '@/components/Tags'

import { ArrowLeftIcon } from '@heroicons/react/24/solid'

type Props = {
  params: {
    id: string
  }
}

const BookSummary = ({ params: { id } }: Props) => {
  const searchParams = useSearchParams()
  const [getBook] = useBooksStore((state) => [state.getBook])
  const [data, setData] = useState<MergeBookInfo>()

  useEffect(() => {
    const fetchBook = async () => {
      const condition = searchParams.get('condition') || 'undamaged'
      const status = searchParams.get('status') || 'free'
      const book = await getBook(id, condition, status)
      setData(book)
    }

    fetchBook()
  }, [id])

  if (!data) return <></>

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
          src={data?.image || ''}
          width={575}
          height={684}
          sizes='100%'
          alt={`Book Preview of ${data?.title}`}
        />
      </div>
      <div className='flex justify-between mb-2 items-center'>
        <h2 className='text-2xl font-medium'>{data.title}</h2>
        <BookActions id={id} status={status} />
      </div>
      <div className='flex gap-1 mb-2'>
        <Tags name='Fee charged' important />
        <Tags name='Undamaged' />
      </div>
      <div className='description mb-2'>{parse(data.description)}</div>
      <p className='flex flex-col mb-2'>
        <span>Publish Year: {new Date(data.publishedDate).getFullYear()}</span>
        <span>Author/s: {data.authors.join(', ')}</span>
      </p>
    </div>
  )
}

export default BookSummary
