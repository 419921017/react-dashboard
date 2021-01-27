import { get } from './http'

type StringNumber = string | number

export const loginByPhoneRequest = (phone?: StringNumber, password?: StringNumber) => {
  return get('')
}

export const sentVcodeRequest = (phone?: StringNumber) => {
  return get('')
}

export const loginByVcodeRequest = (phone?: StringNumber, vcode?: StringNumber) => {
  return get('')
}
