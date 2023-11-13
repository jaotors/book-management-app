import { ReactNode } from 'react'

type Props = {
  label?: string
  children: ReactNode
}
const FormField = ({ label, children }: Props) => (
  <div className='flex flex-col gap-1 mb-2'>
    <label className='mb-1'>{label}</label>
    {children}
  </div>
)

export default FormField
