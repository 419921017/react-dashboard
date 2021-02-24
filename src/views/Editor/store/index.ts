// import { combineReducers } from 'redux'
// import compose, { defaultState as composeDefaultState, IComposeState } from './compose/reducer'
import contextmenu, { defaultState as contextmenuDefaultState, IContextmenuState } from './contextmenu/reducer'
import copy, { defaultState as copyDefaultState, ICopyState } from './copy/reducer'
import edit, { defaultState as editDefaultState, IEditState } from './edit/reducer'
import snapshot, { defaultState as snapshotDefaultState, ISnapshotState } from './snapshot/reducer'

export function combineReducers(reducers: any) {
  // 整合reducer函数的对象的函数
  return function fn(state = {}, action: any) {
    // 返回一个整合之后的reducer函数 ,然后传给了createStore使用
    // 依次调用所有的reduce函数，并得到了状态,然后得到了许多的状态,得到n个新的子状态，封装成对象并返回
    return Object.keys(reducers).reduce((newState: any, key: string) => {
      newState[key] = reducers[key]((state as any)[key], action) // 然后得到新的子状态，赋值给对应的key的新state里面
      return newState
    }, {})
  }
}

const reducer = combineReducers({
  // animation,
  // compose,
  contextmenu,
  copy,
  edit,
  // event,
  // layer,
  // lock,
  snapshot,
})

export const defaultState = {
  // compose: composeDefaultState,
  contextmenu: contextmenuDefaultState,
  copy: copyDefaultState,
  edit: editDefaultState,
  snapshot: snapshotDefaultState,
}

export interface IEditStore {
  // compose: IComposeState
  contextmenu: IContextmenuState
  copy: ICopyState
  edit: IEditState
  snapshot: ISnapshotState
}

export default reducer
