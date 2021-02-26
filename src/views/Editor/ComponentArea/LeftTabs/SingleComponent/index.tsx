import React, { FC, memo } from 'react'
import placeholder from 'Src/assets/placeholder.jpeg'
import { Image } from 'antd'
import { ICustomComponent } from '../../../../../customComponents'

import './index.less'

const SingleComponent: FC<
  ICustomComponent & {
    dataIndex: number
    draggable: boolean
  }
> = (props) => {
  const { label, dataIndex, draggable } = props
  const img = props.img || placeholder
  return (
    <div className='single-component' draggable={draggable} data-index={dataIndex}>
      <Image className='single-component-bg' width={160} src={img} alt={label} />
      <span>{label}</span>
    </div>
  )
}

export default memo(SingleComponent)
