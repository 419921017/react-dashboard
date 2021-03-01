export type propValueType =
  | string
  | number
  | {
      [propsName: string]: any
    }

export interface ICustomComponent {
  propValue: propValueType
  [propsName: string]: any
}
