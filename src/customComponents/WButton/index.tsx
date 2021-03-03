import React, { FC, memo } from 'react'
import { Button } from 'antd'

import { ICustomComponent } from '../types'

const WButton: FC<ICustomComponent> = (props) => {
  let { propValue } = props
  if (typeof propValue !== 'string') {
    return null
  }
  console.log('propValue', propValue)

  if (!propValue) {
    propValue = '默认按钮'
  }

  return (
    <>
      {/* <button type='button'>{propValue}</button> */}
      <Button type='primary'>{propValue}</Button>
    </>
  )
}

export default memo(WButton)
