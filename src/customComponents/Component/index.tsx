import React, { FC, memo } from 'react'
import Picture from '../Picture'
import { IEditComponent } from '../../views/Editor/types'
import { propValueType } from '../types'

type PageStateProps = {
  // [propsName: string]: any
}

type PageDispatchProps = {
  // [propsName: string]: any
}

type PageOwnProps = {
  style: {
    [propsName: string]: any
  }
  propValue: propValueType
  element: IEditComponent
  id: string
  className: string
  handleInput?: (...rest: any[]) => void
}

// type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

const Component: FC<IProps> = (props) => {
  const { id, element, className, handleInput, propValue, style } = props
  const { componentName } = element

  return (
    <div className={className} style={style} id={id}>
      {componentName === 'picture' && <Picture propValue={propValue} />}
    </div>
  )
}

export default memo(Component)
