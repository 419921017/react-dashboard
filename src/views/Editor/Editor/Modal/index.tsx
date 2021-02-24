import React, { memo, FC } from 'react'
import { withDefaultProps } from 'Src/utils/withDefaultProps'
import './index.less'

interface IModal {
  show: boolean
  event?: () => void
}

const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.stopPropagation()
}

const Modal: FC<IModal> = (props) => {
  const { show, event } = props

  const hidden = () => {
    event && event()
  }

  return show ? (
    <div className='modal-bg' onClick={hidden}>
      <div className='fadeInLeft animated modal' onClick={stopPropagation}>
        {props.children}
      </div>
    </div>
  ) : null
}

Modal.defaultProps = {
  show: false,
  event: () => {},
}

export default withDefaultProps(Modal.defaultProps, memo(Modal))
