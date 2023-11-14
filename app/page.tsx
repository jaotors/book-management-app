'use client'

import { useState } from 'react'
import { fetchBooks } from '@/api/books'

import useBooksStore from '@/store/books-store'

import Header from '@/components/Header'
import Card from '@/components/Card'
import getRandomNumber from '@/helpers/getRandomNumber'

const STATUS: { [key: string]: string } = {
  free: 'Free to hire',
  paid: 'Fee charged',
}

export default function Home() {
  const [getBooks] = useBooksStore((state) => [state.getBooks])
  const [data, setData] = useState([])

  const handleSearch = async (search: string) => {
    if (!search) {
      setData([])
      return
    }
    const books = getBooks()
    const data = await fetchBooks(search)
    const newData = data.items.map((book: BookApiInfo) => {
      const dataBook = books.find((parsedBook) => parsedBook.id === book.id)

      const condition = dataBook?.condition || 'undamaged'
      const status = dataBook?.status || Object.keys(STATUS)[getRandomNumber(2)]

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

  return (
    <main className='flex flex-col p-2'>
      <Header onSearch={handleSearch} />
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4'>
        {data.map((book: BookInfo) => (
          <Card
            id={book.id}
            title={book.title}
            authors={book.authors}
            image={book.image}
            publishedDate={book.publishedDate}
            condition={book.condition}
            status={STATUS[book.status]}
          />
        ))}
      </div>
    </main>
  )
}
