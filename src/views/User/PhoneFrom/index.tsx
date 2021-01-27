import React, { FC, memo, ComponentType } from 'react'

const PhoneFrom: FC = (props) => {
  return <div className='login-container'>{props.children}</div>
}

export default memo(PhoneFrom) as ComponentType
