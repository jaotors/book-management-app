'use client'

import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'
import FormField from './FormField'

type Props = {
  label: string
  options: { id: string; name: string }[]
  value: { id: string; name: string }
  onChange: (data: any) => void
}

const SelectField = ({ label, options, onChange, value }: Props) => {
  return (
    <FormField label={label}>
      <Listbox value={value} onChange={onChange}>
        <div className='relative'>
          <Listbox.Button className='relative w-full cursor-default rounded border border-purple-500 p-2'>
            <span className='block truncate text-left'>{value.name}</span>
            <span className='flex items-center pointer-events-none absolute inset-y-0 right-0 pr-2'>
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute mt-1 w-full overflow-auto bg-white py-1 shadow-lg ring-1 ring-black/5 sm:text-sm'>
              {options.map((option, index) => (
                <Listbox.Option
                  key={option.id + index}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 ${
                      active ? 'bg-purple-100 ' : ''
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={` block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.name}
                      </span>

                      {selected ? (
                        <span className='flex items-center absolute inset-y-0 left-0 pl-3 text-purple-600'>
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </FormField>
  )
}

export default SelectField
