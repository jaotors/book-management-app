import type { Metadata } from 'next'

import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Book Management App',
  description: 'Book Management App by Foo Bar Baz',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='flex flex-col bg-purple-200 min-h-screen'>
        <Header />
        {children}
      </body>
    </html>
  )
}
