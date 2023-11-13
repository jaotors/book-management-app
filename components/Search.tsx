const Search = () => {
  return (
    <div className='flex border border-purple-500 rounded  md:w-[800px]  mt-4 mx-auto py-6 px-4'>
      <form className='flex flex-1 gap-1 w-100'>
        <input
          type='text'
          placeholder='Book title'
          name='search'
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
