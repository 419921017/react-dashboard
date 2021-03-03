import { Dispatch, Action } from 'redux'
import store, { IRootDefaultState } from 'Src/store'
import * as actionTypes from './actionTypes'
import { IEditStore } from '..'
import { deleteComponentDispatch, addComponentDispatch, setComponentData } from '../edit/actionCreators'
import { IEditState } from '../edit/reducer'
import decomposeComponent from '../../utils/decomposeComponent'
import { IComposeState } from './reducer'
import { deepCopy } from '../../utils'
import { IEditComponent } from '../../types'

export const setEditor = (payload: any) => ({
  type: actionTypes.SET_EDITOR,
  payload,
})

export const setAreaData = (payload: any) => ({
  type: actionTypes.SET_AREA_DATA,
  payload,
})

export const setAreaDataDispatch = (payload: any) => (dispatch: Dispatch) => {
  dispatch(setAreaData(payload))
}

export const batchDeleteComponentDispatch = (deleteData: any) => (dispatch: Dispatch) => {
  const state = store.getState()
  const { edit } = (state as IRootDefaultState).get('editor')
  const { componentData } = edit
  const componentDataCopy = deepCopy(componentData)

  deleteData.forEach((component: IEditComponent) => {
    for (let i = 0, len = componentDataCopy.length; i < len; i++) {
      if (component.id === componentDataCopy[i].id) {
        componentDataCopy.splice(i, 1)
        break
      }
    }
  })

  dispatch(setComponentData(componentDataCopy))
}

export const composeDispatch = () => {
  return (dispatch: Dispatch) => {
    const state = store.getState()
    const { edit, compose } = (state as IRootDefaultState).get('editor')
    const { componentData } = edit
    const { areaData, editor } = compose
    const components = []

    areaData.components.forEach((component: any) => {
      if (component.component !== 'Group') {
        components.push(component)
      } else {
        // 如果要组合的组件中，已经存在组合数据，则需要提前拆分
        const parentStyle = { ...component.style }
        const subComponents = component.propValue
        const editorRect = editor.getBoundingClientRect()
        deleteComponentDispatch(edit)

        // store.commit('deleteComponent')
        subComponents.forEach((subComponent: IEditComponent) => {
          decomposeComponent(component, editorRect, parentStyle)
          addComponentDispatch({ component: subComponent })
        })

        components.push(...component.propValue)
        batchDeleteComponentDispatch(component.propValue)
        // store.commit('batchDeleteComponent', component.propValue)
      }
    })

    areaData.components = []
  }
}

export const decomposeDispatch = () => {
  return (dispatch: Dispatch) => {
    const state = store.getState()
    const { edit, compose } = (state as IRootDefaultState).get('editor')
    const { curComponent } = edit
    const { editor } = compose

    const parentStyle = { ...curComponent.style }
    const components = curComponent.propValue
    const editorRect = editor.getBoundingClientRect()
    deleteComponentDispatch()
    components.forEach((component: any) => {
      decomposeComponent(component, editorRect, parentStyle)
      addComponentDispatch({ component })
    })
  }
}
