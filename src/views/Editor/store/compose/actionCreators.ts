import { Dispatch } from 'redux'
import * as actionTypes from './actionTypes'
import { IEditStore } from '..'
import { deleteComponentDispatch, addComponentDispatch, setComponentData } from '../edit/actionCreators'
import { IEditComponent } from '../edit/reducer'
import decomposeComponent from '../../utils/decomposeComponent'

export const setEditor = (payload: any) => ({
  type: actionTypes.SET_EDITOR,
  payload,
})

export const setAreaData = (payload: any) => ({
  type: actionTypes.SET_AREA_DATA,
  payload,
})

export const batchDeleteComponent = (store: IEditStore, deleteData: any) => (dispatch: Dispatch) => {
  const { componentData } = store.edit
  const componentDataCopy = componentData.slice()

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

export const compose = (store: IEditStore) => (dispatch: Dispatch) => {
  const { componentData } = store.edit
  const { areaData, editor } = store.compose
  const components = []

  areaData.components.forEach((component) => {
    if (component.component !== 'Group') {
      components.push(component)
    } else {
      // 如果要组合的组件中，已经存在组合数据，则需要提前拆分
      const parentStyle = { ...component.style }
      const subComponents = component.propValue
      const editorRect = editor.getBoundingClientRect()
      deleteComponentDispatch(store)

      // store.commit('deleteComponent')
      subComponents.forEach((subComponent: IEditComponent) => {
        decomposeComponent(component, editorRect, parentStyle)
        addComponentDispatch(store, { component: subComponent })
      })

      components.push(...component.propValue)
      batchDeleteComponent(store, component.propValue)
      // store.commit('batchDeleteComponent', component.propValue)
    }
  })

  areaData.components = []
}
