'use client'

import { Popover } from '@headlessui/react'

import CheckoutForm from '../CheckoutForm'
import ReturnForm from '../ReturnForm'

type Props = {
  id: string
  status: string
  borrowed: boolean
}

const BookActions = ({ id, status, borrowed }: Props) => {
  return (
    <Popover className='relative'>
      <Popover.Button className='bg-purple-500 rounded text-white py-2 px-4'>
        {borrowed ? 'Return' : 'Checkout'}
      </Popover.Button>
      <Popover.Panel className='absolute right-0 z-10 border bg-white border-b-purple-950 rounded'>
        {({ close }) =>
          borrowed ? (
            <ReturnForm id={id} onClose={close} />
          ) : (
            <CheckoutForm id={id} status={status} onClose={close} />
          )
        }
      </Popover.Panel>
    </Popover>
  )
}

export default BookActions
