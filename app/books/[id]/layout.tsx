import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export default function BooksSummaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='p-2'>
      {children}
      <ToastContainer />
    </div>
  )
}
