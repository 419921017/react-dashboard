import { produce } from 'immer'
import { Reducer } from 'redux'

import * as actionTypes from './actionTypes'

export interface IComponentAreaState {
  currentTab: string | number
}

export const defaultState: IComponentAreaState = {
  currentTab: '基础组件',
}

const reducer: Reducer = (state = defaultState, action: any) =>
  produce(state, (draft: IComponentAreaState) => {
    switch (action.type) {
      case actionTypes.SET_ACTIVE_TAB:
        draft.currentTab = action.payload
    }
  })

export default reducer
