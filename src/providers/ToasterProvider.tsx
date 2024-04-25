import { FC } from 'react'
import { Toaster } from 'sonner'

const ToasterProvider: FC = () => {
  return <Toaster position="top-right" />
}

export default ToasterProvider
