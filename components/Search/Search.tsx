import { useState, useCallback, ChangeEvent, FormEvent } from 'react'

type Props = {
  onSearch: (search: string) => {}
}

const Search = ({ onSearch }: Props) => {
  const [search, setSearch] = useState<string>('')

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setSearch(value)
  }

  const handleSearch = useCallback(
    (evt: FormEvent) => {
      evt.preventDefault()
      onSearch(search)
    },
    [search]
  )

  return (
    <div className='flex border border-purple-500 rounded  md:w-[800px]  mt-4 mx-auto py-6 px-4'>
      <form onSubmit={handleSearch} className='flex flex-1 gap-1 w-100'>
        <input
          type='text'
          placeholder='Book title'
          name='search'
          onChange={handleInputChange}
          className='flex flex-1 border border-purple-500 rounded w-100 p-2'
        />
        <button
          type='submit'
          className='bg-purple-500 rounded text-white py-2 px-4'
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default Search
