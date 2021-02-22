type stringNumber = string | number

type propVale = stringNumber | (string | number)[] | { [propName: string]: any }

interface IEvent {
  [propName: string]: any
}
interface IAnimation {
  [propName: string]: any
}

interface IStyle {
  // 组件样式
  x: stringNumber
  y: stringNumber
  width: stringNumber
  height: stringNumber
  fontSize?: stringNumber
  fontWeight?: stringNumber
  lineHeight?: stringNumber
  letterSpacing?: stringNumber
  textAlign?: stringNumber
  color?: stringNumber
  [propName: string]: any
}

export interface IComponentProps {
  component: string // 组件名称
  label: string // 左侧组件列表中显示的名字
  propValue: propVale // 组件所使用的值
  icon: string // 左侧组件列表中显示的名字
  animations: IAnimation // 动画列表
  events: IEvent // 事件列表
  style: IStyle
  [propName: string]: any
}

export interface IComponentState {
  isEdit: boolean
}
