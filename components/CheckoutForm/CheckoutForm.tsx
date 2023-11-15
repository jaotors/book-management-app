'use client'

import { useState, FormEvent } from 'react'

import useToasts from '@/hooks/use-toast'

import useBooksStore from '@/store/books-store'

import DatePickerField from '../DatePickerField'
import FormField from '../FormField'
import SelectField from '../SelectField'

import BOOK_CONDITIONS from '@/fixtures/book-condition'
import { addTransaction } from '@/localStorage'

type Props = {
  id: string
  status: string
  onClose: () => void
}

const CheckoutForm = ({ id, status, onClose }: Props) => {
  const { successToast } = useToasts()
  const [checkoutBook] = useBooksStore((state) => [state.checkoutBook])
  const [selectedCondition, setSelectedCondition] = useState<Condition>(
    BOOK_CONDITIONS[0]
  )
  const [dateTime, setDateTime] = useState<Date | null>(null)

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const formData = new FormData(evt.currentTarget)
    const name = formData.get('name')?.toString()

    if (!name || !selectedCondition || !dateTime) return

    const data = {
      borrower: name,
      status,
      borrowed: true,
      condition: selectedCondition.id,
      borrowedAt: dateTime,
    }

    const transactionData: TransactionInfo = {
      id: new Date().getTime().toString(),
      bookId: id,
      ...data,
    }

    checkoutBook(id, data)
    addTransaction(transactionData)

    successToast('Book has been successfully borrowed')
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col p-2'>
      <FormField label='Customer Name'>
        <input
          type='text'
          name='name'
          className='border border-purple-500 rounded p-2'
        />
      </FormField>
      <DatePickerField label='Date and time' onChange={setDateTime} />
      <SelectField
        label='Condition'
        options={BOOK_CONDITIONS}
        onChange={(data) => {
          setSelectedCondition(data)
        }}
        value={selectedCondition}
      />
      <button
        type='submit'
        className='bg-purple-500 rounded text-white py-2 px-4'
      >
        Save
      </button>
    </form>
  )
}

export default CheckoutForm
