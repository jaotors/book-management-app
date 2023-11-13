import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Management App',
  description: 'Book Management App by Foo Bar Baz',
}

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className='p-2'>{children}</div>
}
