import { message } from 'antd'
import { MessageApi } from 'antd/lib/message'

interface IToast {
  (context: any, type?: keyof MessageApi, duration?: number, cb?: () => void): void
}
const toast: IToast = (context = '', type = 'error', duration = 1500, cb = () => {}) => {
  message[type](context, duration, cb)
}

export default toast
