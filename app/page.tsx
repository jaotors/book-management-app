'use client'

import { useState } from 'react'
import { getBooks } from '@/api/books'
import Header from '@/components/Header'
import Card from '@/components/Card'

export default function Home() {
  const [data, setData] = useState<BookInfo[]>([])

  const handleSearch = async (search: string) => {
    const data = await getBooks(search)

    setData(data.items)
  }

  return (
    <main className='flex flex-col p-2'>
      <Header onSearch={handleSearch} />
      <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4'>
        {data.map((book: BookInfo) => (
          <Card
            id={book.id}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors}
            image={book.volumeInfo.imageLinks.thumbnail}
            publishedDate={book.volumeInfo.publishedDate}
            condition='undamaged'
            status='free'
          />
        ))}
      </div>
    </main>
  )
}
