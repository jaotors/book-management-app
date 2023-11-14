import type { Metadata } from 'next'

import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
