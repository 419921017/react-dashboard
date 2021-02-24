import React, { FC, memo } from 'react'
import { ICustomComponent } from '../types'

const Picture: FC<ICustomComponent> = (props) => {
  const { propValue, alt = '' } = props
  return (
    <div style={{ overflow: 'hidden' }}>
      <img src={propValue as string} alt={alt} />
    </div>
  )
}

export default memo(Picture)
