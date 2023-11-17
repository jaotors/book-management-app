'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import clsx from 'clsx'

import { fetchBooks } from '@/api/books'

import useBooksStore from '@/store/books-store'

import Search from '@/components/Search'
import Card from '@/components/Card'

import getRandomNumber from '@/helpers/get-random-number'

import STATUS from '@/fixtures/book-status'

export default function Books() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')

  const [getBooks] = useBooksStore((state) => [state.getBooks])
  const [data, setData] = useState<any>([])
  const [loanFilter, setLoanFilter] = useState<Boolean | null>(null)

  useEffect(() => {
    if (!searchQuery) return

    const fetchQuery = async () => {
      const books = getBooks()
      const data = await fetchBooks(searchQuery)

      const newData = data?.items.map((book: BookApiInfo) => {
        const dataBook = books.find((parsedBook) => parsedBook.id === book.id)

        const condition = dataBook?.condition || 'undamaged'
        const status =
          dataBook?.status || Object.keys(STATUS)[getRandomNumber(2)]
        const borrowed = dataBook?.borrowed

        return {
          id: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          image: book.volumeInfo.imageLinks?.thumbnail,
          publishedDate: book.volumeInfo.publishedDate,
          condition,
          status,
          borrowed,
        }
      })

      const filteredData = newData.filter((data: any) => {
        if (loanFilter === null) return true

        return data.borrowed === loanFilter
      })

      setData(filteredData)
    }

    fetchQuery()
  }, [searchQuery, getBooks, loanFilter])

  const handleFilter = (filter: Boolean | null) => {
    setLoanFilter((state) => (state === filter ? null : filter))
  }

  if (!searchQuery) return <></>

  return (
    <>
      <Search />
      <main className='flex flex-col p-2 mt-4'>
        <ul className='flex gap-3 justify-end mb-5'>
          <li>
            <button
              className={clsx(
                'bg-purple-500 text-white rounded py-2 px-3',
                loanFilter === true ? 'bg-purple-900' : ''
              )}
              onClick={() => handleFilter(true)}
            >
              On Loan
            </button>
          </li>
          <li>
            <button
              className={clsx(
                'bg-purple-500 text-white rounded py-2 px-3',
                loanFilter === false ? 'bg-purple-900' : ''
              )}
              onClick={() => handleFilter(false)}
            >
              On Shelf
            </button>
          </li>
        </ul>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4'>
          {data.map((book: BookInfo, index: number) => (
            <Card
              key={`${book.id} + ${index}`}
              id={book.id}
              title={book.title}
              authors={book.authors}
              image={book.image}
              publishedDate={book.publishedDate}
              condition={book.condition}
              status={book.status}
              borrowed={book.borrowed}
            />
          ))}
        </div>
      </main>
    </>
  )
}
