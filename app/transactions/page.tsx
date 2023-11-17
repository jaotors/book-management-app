'use client'

import { ChangeEvent, useState, useEffect } from 'react'
import useTransactionStore from '@/store/transactions-store'

export default function Transactions() {
  const getTransactions = useTransactionStore((state) => state.getTransactions)
  const [search, setSearch] = useState('')
  const [transactions, setTransactions] = useState<TransactionInfo[]>([])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    const localTransactions: TransactionInfo[] = getTransactions()

    if (search) {
      const filteredTransactions = !search
        ? localTransactions
        : localTransactions.filter((transaction: TransactionInfo) => {
            return (
              transaction.borrower
                .toLowerCase()
                .indexOf(search.toLowerCase()) !== -1
            )
          })
      setTransactions(filteredTransactions)
    } else {
      setTransactions(localTransactions)
    }
  }, [search, getTransactions])

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
          <tr>
            <th>id</th>
            <th>book id</th>
            <th>condition</th>
            <th>borrower</th>
            <th>borrowed at</th>
            <th>returned at</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction: TransactionInfo) => {
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
