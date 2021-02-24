export type propValue =
  | string
  | number
  | {
      [propsName: string]: any
    }

export interface ICustomComponent {
  propValue: propValue
  [propsName: string]: any
}
