import Image from 'next/image'
import Link from 'next/link'

import Tags from '../Tags'

import STATUS from '@/fixtures/book-status'

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
    <Link
      href={`/books/${id}?condition=${condition}&status=${status}`}
      className='bg-white border-2 border-white rounded visited:border-purple-900'
      key={id}
    >
      <div className='flex flex-col p-2 rounded'>
        <div className='relative w-100 rounded overflow-hidden h-[128px] mb-2'>
          <Image
            src={image}
            layout='fill'
            objectFit='contain'
            className='w-100'
            alt={`Book Preview of ${title}`}
          />
        </div>
        <div className='flex justify-between items-center'>
          <Tags name={STATUS[status]} important />
          <Tags name={condition} />
        </div>
        <h3 className='text-md font-medium'>{title}</h3>
        <p className='mb-1'>
          Publish Year: {new Date(publishedDate).getFullYear()}
        </p>
        <p>{authors?.join(',')}</p>
      </div>
    </Link>
  )
}

export default Card
