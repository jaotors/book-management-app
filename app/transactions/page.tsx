'use client'

import { ChangeEvent, useState } from 'react'
import { getAllTransactions } from '@/localStorage'

export default function Transactions() {
  const transactions = getAllTransactions()
  const [search, setSearch] = useState('')

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const filteredTransactions = !search
    ? transactions
    : transactions.filter((transaction: TransactionInfo) => {
        return (
          transaction.borrower.toLowerCase().indexOf(search.toLowerCase()) !==
          -1
        )
      })

  return (
    <div className='p-2 mt-6'>
      <div className='flex items-center justify-end gap-2 w-full'>
        <label>Search</label>
        <input
          value={search}
          onChange={handleSearch}
          className='p-2 border-purple-400 rounded'
        />
      </div>
      <table className='w-full border-purple-600'>
        <thead className='w-full'>
          <th>id</th>
          <th>book id</th>
          <th>condition</th>
          <th>borrower</th>
          <th>borrowed at</th>
          <th>returned at</th>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction: TransactionInfo) => {
            const borrowedAt = transaction.borrowedAt
              ? new Date(transaction.borrowedAt).toDateString()
              : '---'
            const returnedAt = transaction.returnedAt
              ? new Date(transaction.returnedAt).toDateString()
              : '---'

            return (
              <tr key={transaction.id} className='text-center'>
                <td>{transaction.id}</td>
                <td>{transaction.bookId}</td>
                <td>{transaction.condition}</td>
                <td>{transaction.borrower}</td>
                <td>{borrowedAt}</td>
                <td>{returnedAt}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
