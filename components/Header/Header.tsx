'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

const Header = () => {
  return (
    <div className='bg-purple-300 items-center p-2'>
      <div className='flex align-center items-center justify-between'>
        <h1 className='text-4xl font-black text-white text-center'>
          <Link href='/'>ABC Company</Link>
        </h1>
        <nav className='hidden md:flex gap-2'>
          <Link
            className='p-3 font-medium text-white text-lg hover:underline'
            href='/books'
          >
            Books
          </Link>
          <Link
            className='p-3 font-medium text-white text-lg hover:underline'
            href='/transactions'
          >
            Transactions
          </Link>
        </nav>
        <div className='md:hidden flex'>
          <Popover className='relative'>
            {({ open }) => (
              <>
                <Popover.Button className='bg-purple-500 rounded text-white py-2 px-4'>
                  {open ? (
                    <XMarkIcon className='w-6 h-6' />
                  ) : (
                    <Bars3Icon className='w-6 h-6' />
                  )}
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-200'
                  enterFrom='opacity-0 translate-y-1'
                  enterTo='opacity-100 translate-y-0'
                  leave='transition ease-in duration-150'
                  leaveFrom='opacity-100 translate-y-0'
                  leaveTo='opacity-0 translate-y-1'
                >
                  <Popover.Panel className='absolute right-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl'>
                    <div className='overflow-hidden bg-white rounded shadow ring-1 ring-black/5'>
                      <ul>
                        <li className='border-b-gray-700'>
                          <Link
                            className='block p-4 text-md text-gray-700 hover:bg-purple-300 hover:text-white'
                            href='/books'
                          >
                            Books
                          </Link>
                        </li>
                        <li>
                          <Link
                            className='block p-4 text-md text-gray-700 hover:bg-purple-300 hover:text-white'
                            href='/transactions'
                          >
                            Transactions
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default Header
