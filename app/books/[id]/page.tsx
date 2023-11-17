'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import parse from 'html-react-parser'

import useBooksStore from '@/store/books-store'

import BookActions from '@/components/BookActions'
import Tags from '@/components/Tags'

import { ArrowLeftIcon } from '@heroicons/react/24/solid'

import STATUS from '@/fixtures/book-status'

type Props = {
  params: {
    id: string
  }
}

const BookSummary = ({ params: { id } }: Props) => {
  const router = useRouter()
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
  }, [id, getBook, searchParams])

  if (!data) return <></>

  return (
    <div className='flex flex-col p-4'>
      <button
        type='button'
        onClick={() => {
          router.back()
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
        <div>
          <h2 className='text-2xl font-medium'>{data.title}</h2>
          <p className='flex flex-col mb-2'>
            <span>
              Publish Year: {new Date(data.publishedDate).getFullYear()}
            </span>
            <span>Author/s: {data.authors.join(', ')}</span>
          </p>
        </div>
        <BookActions id={id} status={data.status} borrowed={data.borrowed} />
      </div>
      <div className='flex gap-1 mb-2'>
        <Tags name={STATUS[data.status]} important />
        <Tags name={data.condition} />
      </div>
      <div className='description mb-2'>{parse(data.description)}</div>
    </div>
  )
}

export default BookSummary
