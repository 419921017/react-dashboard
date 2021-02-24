import React, { FC, memo } from 'react'
import { ICustomComponent } from '../types'

const Button: FC<ICustomComponent> = (props) => {
  const { propValue } = props
  return <button type='button'>{{ propValue }}</button>
}

export default memo(Button)
