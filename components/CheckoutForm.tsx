'use client'

import { useState, FormEvent } from 'react'

import DatePickerField from './DatePickerField'
import FormField from './FormField'
import SelectField from './SelectField'

const BOOK_CONDITIONS = [
  {
    id: 'undamaged',
    name: 'Undamaged',
  },
  {
    id: 'damaged',
    name: 'Damaged',
  },
]

const CheckoutForm = () => {
  const [selectedCondition, setSelectedCondition] = useState(BOOK_CONDITIONS[0])

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
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
      <DatePickerField label='Date and time' />
      <SelectField
        label='Condition'
        options={BOOK_CONDITIONS}
        onChange={(data) => {
          setSelectedCondition(data)
        }}
        value={selectedCondition}
      />
      <button className='bg-purple-500 rounded text-white py-2 px-4'>
        Save
      </button>
    </form>
  )
}

export default CheckoutForm
