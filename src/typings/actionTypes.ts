import { Action as ReduxAction } from 'redux'

export type Action<State, Types extends string, Actions extends ReduxAction<Types>> = {
  readonly [Type in Types]: (state: State, action: Extract<Actions, ReduxAction<Type>>) => State
}
