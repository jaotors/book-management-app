import { create } from 'zustand'
import { getAllTransactions } from '@/localStorage'

type TransactionState = {
  transactions: TransactionInfo[]
  getTransactions: () => TransactionInfo[]
}

const useTransactionStore = create<TransactionState>()((set, get) => ({
  transactions: [],
  getTransactions: () => {
    const transactions = getAllTransactions()
    set({ transactions })
    return transactions
  },
}))

export default useTransactionStore
