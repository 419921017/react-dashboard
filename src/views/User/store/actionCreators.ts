import { Dispatch } from 'redux'
import { loginByPhoneRequest, sentVcodeRequest, loginByVcodeRequest } from '../../../api/login'
import { CHANGE_USER_INFO, CHANGE_SENT_STATUS, CHANGE_LOGIN_STATUS } from './constants'

export const saveUserInfo = (payload: any) => ({
  type: CHANGE_USER_INFO,
  payload,
})

export const saveSentStatus = (payload: any) => ({
  type: CHANGE_SENT_STATUS,
  payload,
})

export const saveLoginStatus = (payload: any) => ({
  type: CHANGE_LOGIN_STATUS,
  payload,
})

export const loginByPhone = (phone: string | number, password: string | number) => {
  return (dispatch: Dispatch) => {
    loginByPhoneRequest(phone, password)
      .then((res) => {
        dispatch(saveUserInfo(res))
        return res
      })
      .catch(() => {
        console.log('登录失败！')
      })
  }
}

export const loginByVcode = (phone: string | number, vcode: string | number) => {
  return (dispatch: Dispatch) => {
    loginByVcodeRequest(phone, vcode)
      .then((res) => {
        if (res.code === 200) {
          dispatch(saveUserInfo(res))
          dispatch(saveLoginStatus(true))
        }
        return res
      })
      .catch(() => {
        console.log('登录失败！')
      })
  }
}

export const sentVcode = (phone: string | number) => {
  return (dispatch: Dispatch) => {
    sentVcodeRequest(phone)
      .then((res) => {
        if (res.code === 200) {
          dispatch(saveSentStatus(true))
        }
        return res
      })
      .catch(() => {
        console.log('请求失败！')
      })
  }
}
