'use client'

import { Popover } from '@headlessui/react'

import CheckoutForm from './CheckoutForm'

type Props = {
  status?: string
}

const BookActions = ({ status }: Props) => {
  return (
    <Popover className='relative'>
      <Popover.Button className='bg-purple-500 rounded text-white py-2 px-4'>
        Checkout
      </Popover.Button>
      <Popover.Panel className='absolute z-10 border border-b-purple-950 rounded'>
        <CheckoutForm />
      </Popover.Panel>
    </Popover>
  )
}

export default BookActions
