import clsx from 'clsx'

type Props = {
  name: string
  important?: boolean
}

const Tags = ({ name, important = false }: Props) => {
  return (
    <div
      className={clsx(
        'rounded p-1 px-2 border text-sm capitalize text-white',
        important ? 'bg-purple-500' : 'bg-blue-400'
      )}
    >
      {name}
    </div>
  )
}

export default Tags
