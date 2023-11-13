import Image from 'next/image'
import Link from 'next/link'

type Props = {
  id: string
  condition: string
  status: string
  authors: string[]
  title: string
  image: string
  publishedDate: string
}

const Card = ({
  id,
  condition,
  status,
  authors,
  title,
  image,
  publishedDate,
}: Props) => {
  return (
    <Link href={`/books/${id}`} key={id}>
      <div className='flex flex-col p-2 rounded border border-b-purple-800'>
        <div className='relative w-100 rounded overflow-hidden h-[128px]'>
          <Image
            src={image}
            layout='fill'
            objectFit='contain'
            className='w-100'
            alt={`Book Preview of ${title}`}
          />
        </div>
        <div className='flex justify-between items-center'>
          <span>{status}</span>
          <span>{condition}</span>
        </div>
        <h3>{title}</h3>
        <p>
          <span>{publishedDate}</span>-<span>{authors.join(',')}</span>
        </p>
      </div>
    </Link>
  )
}

export default Card
