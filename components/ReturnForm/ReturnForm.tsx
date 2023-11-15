'use client'

import { FormEvent, useState } from 'react'

import useToasts from '@/hooks/use-toast'

import DatePickerField from '../DatePickerField'
import SelectField from '../SelectField'

import BOOK_CONDITIONS from '@/fixtures/book-condition'
import useBooksStore from '@/store/books-store'
import { addTransaction } from '@/localStorage'

type Props = {
  id: string
  onClose: () => void
}

const ReturnForm = ({ id, onClose }: Props) => {
  const [getBook, returnBook] = useBooksStore((state) => [
    state.getBook,
    state.returnBook,
  ])
  const { successToast } = useToasts()
  const [selectedCondition, setSelectedCondition] = useState<Condition>(
    BOOK_CONDITIONS[0]
  )
  const [returnDate, setReturnDate] = useState<Date | null>()

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const book = await getBook(id, selectedCondition.id)

    const transactionData = {
      id: new Date().getTime().toString(),
      bookId: id,
      borrower: book.borrower,
      returnedAt: returnDate,
      borrowed: false,
      condition: selectedCondition.id,
    }

    if (!book) return
    returnBook(id, { condition: selectedCondition.id, returnedAt: returnDate! })
    addTransaction(transactionData)

    successToast('Book successfully returned')
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col p-2'>
      <DatePickerField label='Return Date and Time' onChange={setReturnDate} />
      <SelectField
        label='Condition'
        value={selectedCondition}
        options={BOOK_CONDITIONS}
        onChange={setSelectedCondition}
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

export default ReturnForm
