'use client'

import { Popover } from '@headlessui/react'

import CheckoutForm from '../CheckoutForm'

type Props = {
  id: string
  status: string
}

const BookActions = ({ id, status }: Props) => {
  return (
    <Popover className='relative'>
      <Popover.Button className='bg-purple-500 rounded text-white py-2 px-4'>
        Checkout
      </Popover.Button>
      <Popover.Panel className='absolute z-10 border border-b-purple-950 rounded'>
        <CheckoutForm id={id} status={status} />
      </Popover.Panel>
    </Popover>
  )
}

export default BookActions
