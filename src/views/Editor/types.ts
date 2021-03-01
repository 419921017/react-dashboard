type stringNumber = string | number

type propVale = stringNumber | (string | number | IEditComponent)[] | { [propName: string]: any }

interface IEvent {
  [propName: string]: any
}
type IAnimation = any[]

interface IStyle {
  // 组件样式
  x: number
  y: number
  width: number
  height: number
  fontSize?: number
  fontWeight?: number
  lineHeight?: number
  letterSpacing?: number
  textAlign?: 'string'
  color?: string
  [propName: string]: any
}

export interface IComponentProps {
  id?: number
  component: string // 组件名称
  label: string // 左侧组件列表中显示的名字
  propValue: propVale // 组件所使用的值
  icon: string // 左侧组件列表中显示的名字
  animations: IAnimation // 动画列表
  events: IEvent // 事件列表
  style: IStyle
  [propName: string]: any
}

export interface IEditComponent extends IComponentProps {
  isLock: boolean
}
