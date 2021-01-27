import React, { FC, memo, ComponentType } from 'react'

const LoginFrom: FC = (props) => {
  return <div className='login-container'>{props.children}</div>
}

export default memo(LoginFrom) as ComponentType
