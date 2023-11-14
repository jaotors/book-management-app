import { create } from 'zustand'

type ModalState = {
  isOpen: boolean
  title: string
  content: string
  openPopup: (data: { title: string; content: string }) => void
  closePopup: () => void
}

const useModalStore = create<ModalState>()((set) => ({
  isOpen: false,
  title: '',
  content: '',
  openPopup: (data: { title: string; content: string }) =>
    set({ isOpen: true, ...data }),
  closePopup: () => set({ isOpen: false }),
}))

export default useModalStore
