import { produce } from 'immer'
import { Reducer } from 'redux'
// import { ComponentType } from 'react'

import * as actionTypes from './actionTypes'
// import { COPY } from './actionTypes';

export interface ICopyState {
  copyData: any // 复制粘贴剪切
  isCut: boolean
}

export const defaultState = { copyData: null, isCut: false }

const reducer: Reducer = (state = defaultState, action: any) =>
  produce(state, (draft: ICopyState) => {
    switch (action.type) {
      case actionTypes.COPY:
        draft.copyData = action.payload
        return
      case actionTypes.CUT_STATE:
        draft.isCut = action.payload
    }
  })

export default reducer
