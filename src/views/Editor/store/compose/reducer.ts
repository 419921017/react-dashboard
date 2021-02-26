import { produce } from 'immer'
import { Reducer } from 'redux'

import * as actionTypes from './actionTypes'
import { IEditComponent } from '../edit/reducer'

export interface IComposeState {
  areaData: {
    style: {
      top: number
      left: number
      width: number
      height: number
    }
    components: IEditComponent[]
  }
  editor: HTMLElement | null
}

export const defaultState = {
  areaData: {
    style: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
    components: [],
  },
  editor: null,
}

const reducer: Reducer = (state = defaultState, action: any) =>
  produce(state, (draft: IComposeState) => {
    switch (action.type) {
      case actionTypes.SET_EDITOR:
        draft.editor = action.payload
        return
      case actionTypes.SET_AREA_DATA:
        draft.areaData = action.payload
    }
  })

export default reducer
