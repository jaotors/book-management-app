import { FormEvent, useState } from 'react'

import { getBook, updateBook } from '@/localStorage'

import useToasts from '@/hooks/use-toast'

import DatePickerField from '../DatePickerField'
import SelectField from '../SelectField'

import BOOK_CONDITIONS from '@/fixtures/book-condition'

type Props = {
  id: string
  onClose: () => void
}

const ReturnForm = ({ id, onClose }: Props) => {
  const { successToast } = useToasts()
  const [selectedCondition, setSelectedCondition] = useState<Condition>(
    BOOK_CONDITIONS[0]
  )
  const [returnDate, setReturnDate] = useState<Date | null>()

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const data: StorageBookInfo = {
      id,
      condition: selectedCondition.id,
      borrowed: false,
      borrower: '',
      returnedAt: returnDate,
    }

    const book = getBook(id)

    if (!book) return
    updateBook(data)

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
