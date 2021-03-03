import React, { FC, memo } from 'react'
import { ICustomComponent } from '../types'

const WText: FC<ICustomComponent> = (props) => {
  const { propValue, alt = '' } = props

  if (typeof propValue !== 'string') {
    return null
  }
  return (
    <div className='w-text' style={{ overflow: 'hidden' }}>
      <img src={propValue} alt={alt} />
    </div>
  )
}

export default memo(WText)
