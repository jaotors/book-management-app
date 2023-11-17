'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { fetchBooks } from '@/api/books'

import useBooksStore from '@/store/books-store'

import Search from '@/components/Search'
import Card from '@/components/Card'

import getRandomNumber from '@/helpers/get-random-number'

import STATUS from '@/fixtures/book-status'

export default function Books() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')

  const [books] = useBooksStore((state) => [state.books])
  const [data, setData] = useState([])

  useEffect(() => {
    if (!searchQuery) return

    const fetchQuery = async () => {
      const data = await fetchBooks(searchQuery)

      const newData = data?.items.map((book: BookApiInfo) => {
        const dataBook = books.find((parsedBook) => parsedBook.id === book.id)

        const condition = dataBook?.condition || 'undamaged'
        const status =
          dataBook?.status || Object.keys(STATUS)[getRandomNumber(2)]

        return {
          id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          image: book.volumeInfo.imageLinks?.thumbnail,
          publishedDate: book.volumeInfo.publishedDate,
          condition,
          status,
        }
      })

      setData(newData)
    }

    fetchQuery()
  }, [])

  if (!searchQuery) return <></>

  return (
    <>
      <Search />
      <main className='flex flex-col p-2'>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4'>
          {data.map((book: BookInfo) => (
            <Card
              id={book.id}
              title={book.title}
              authors={book.authors}
              image={book.image}
              publishedDate={book.publishedDate}
              condition={book.condition}
              status={book.status}
            />
          ))}
        </div>
      </main>
    </>
  )
}
