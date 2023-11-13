'use client'

import { getBooks } from '@/api/getBooks'
import { useSearchParams } from 'next/navigation'

export default async function Home() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  const data = await getBooks(search)

  if (!search) {
    return <></>
  }

  return <main className='flex flex-col p-2'></main>
}
