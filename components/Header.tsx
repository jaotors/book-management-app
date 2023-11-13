import Search from './Search'

type Props = {
  onSearch: (query: string) => {}
}

const Header = ({ onSearch }: Props) => {
  return (
    <div className='flex flex-col align-center mb-4'>
      <h1 className='text-4xl font-black text-center'>ABC Company</h1>
      <Search onSearch={onSearch} />
    </div>
  )
}

export default Header
