import { toast } from 'react-toastify'

const useToasts = () => {
  const successToast = (content: string) => {
    toast(content, {
      type: 'success',
      autoClose: 3000,
    })
  }

  const errorToast = (content: string) => {
    toast(content, {
      type: 'error',
      autoClose: 3000,
    })
  }

  return {
    successToast,
    errorToast,
  }
}

export default useToasts
