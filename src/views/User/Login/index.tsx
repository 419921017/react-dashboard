import React, { FC, memo, ComponentType } from 'react'
import './style.scss'

const Login: FC = (props) => {
  return <div className='login-container'>{props.children}</div>
}

export default memo(Login) as ComponentType
