'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { Datepicker } from '@aliakbarazizi/headless-datepicker'
import FormField from './FormField'

type Props = {
  label: string
  onChange: (date: Date | null) => void
}

const DatePickerField = ({ label, onChange }: Props) => {
  const [value, setValue] = useState<Date | null>(null)

  return (
    <FormField label={label}>
      <Datepicker
        onChange={(date) => {
          onChange(date)
          setValue(date)
        }}
        value={value}
      >
        <Datepicker.Input
          format='yyyy/MM/dd HH:mm'
          className='flex w-60 rounded-md p-2 shadow-sm outline-none ring-1 ring-gray-500 focus-within:ring-2 focus-within:ring-purple-600'
        />
        <Datepicker.Picker
          defaultType='day'
          className='rounded-md bg-white p-4 shadow-md text-gray-900'
        >
          {({ monthName, hour, minute, year }) => (
            <>
              <div className='flex w-full items-center justify-between space-x-6 py-2 rtl:space-x-reverse'>
                <Datepicker.Button
                  type='button'
                  action='prev'
                  className='rounded-full p-2 text-sm font-medium hover:bg-purple-700 hover:text-white rtl:rotate-180'
                >
                  Prev
                </Datepicker.Button>
                <div className='flex'>
                  <Datepicker.Button
                    type='button'
                    action='toggleHourPicker'
                    className='leading-2 p-2 text-lg font-semibold hover:bg-purple-700 hover:text-white flex items-center space-x-2'
                  >
                    {('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2)}
                  </Datepicker.Button>
                  <Datepicker.Button
                    type='button'
                    action='toggleMonth'
                    className='leading-2 p-2 text-lg font-semibold hover:bg-purple-700 hover:text-white'
                  >
                    {monthName}
                  </Datepicker.Button>
                  <Datepicker.Button
                    type='button'
                    action='toggleYear'
                    className='leading-2 p-2 text-lg font-semibold hover:bg-purple-700 hover:text-white'
                  >
                    {year}
                  </Datepicker.Button>
                </div>
                <Datepicker.Button
                  type='button'
                  action='next'
                  className='rounded-full p-2 text-sm font-medium hover:bg-purple-700 hover:text-white rtl:rotate-180'
                >
                  Next
                </Datepicker.Button>
              </div>
              <Datepicker.Items
                className={({ type }) =>
                  clsx(
                    'grid w-full auto-rows-max gap-4 overflow-y-auto scroll-smooth',
                    type === 'day' && 'grid-cols-7',
                    type === 'month' && 'grid-cols-3',
                    type === 'year' && 'max-h-[274px] grid-cols-4'
                  )
                }
              >
                {({ items }) =>
                  items.map((item) => (
                    <Datepicker.Item
                      type='button'
                      key={item.key}
                      item={item}
                      className={clsx(
                        'grid items-center justify-center rounded-full py-1.5 text-sm font-medium select-none',
                        item.isHeader
                          ? 'cursor-default'
                          : 'hover:bg-purple-700',
                        item.disabled ? 'text-gray-500' : 'hover:text-white',
                        item.type === 'day' && 'h-8 w-8',
                        item.isSelected && 'bg-purple-600',
                        item.isToday && 'border border-gray-500'
                      )}
                      action={
                        item.type === 'day'
                          ? 'close'
                          : item.type === 'month'
                          ? 'showDay'
                          : 'showMonth'
                      }
                    >
                      {item.isHeader ? item.text.substring(0, 2) : item.text}
                    </Datepicker.Item>
                  ))
                }
              </Datepicker.Items>
              <Datepicker.Button
                type='button'
                action='today'
                className='mt-4 w-full rounded bg-purple-500 hover:bg-purple-600 p-2 text-sm font-medium text-white'
              >
                Today
              </Datepicker.Button>
              <Datepicker.Picker
                className='flex max-h-56 rounded-md border border-gray-600 bg-white py-2 shadow-md rtl:flex-row-reverse dark:bg-gray-800 dark:text-gray-300'
                id='HourPicker'
              >
                <Datepicker.Items
                  type='hour'
                  className='overflow-y-auto scroll-smooth px-4'
                  disableAutoScroll
                >
                  {({ items }) =>
                    items.map((item) => (
                      <Datepicker.Item
                        key={item.key}
                        item={item}
                        action='close'
                        className={clsx(
                          'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium hover:bg-purple-700 hover:text-white',
                          item.isSelected && 'bg-gray-600'
                        )}
                      >
                        {('0' + item.text).slice(-2)}
                      </Datepicker.Item>
                    ))
                  }
                </Datepicker.Items>
                <Datepicker.Items
                  type='minute'
                  className='overflow-y-auto scroll-smooth px-4'
                  disableAutoScroll
                >
                  {({ items }) =>
                    items.map((item) => (
                      <Datepicker.Item
                        key={item.key}
                        item={item}
                        action='close'
                        className={clsx(
                          'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium hover:bg-purple-700 hover:text-white',
                          item.isSelected && 'bg-gray-600'
                        )}
                      >
                        {('0' + item.text).slice(-2)}
                      </Datepicker.Item>
                    ))
                  }
                </Datepicker.Items>
              </Datepicker.Picker>
            </>
          )}
        </Datepicker.Picker>
      </Datepicker>
    </FormField>
  )
}

export default DatePickerField
