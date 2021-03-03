export interface ICommonStyle {
  rotate?: number
  opacity?: number
  width: number
  height: number
  fontSize?: number
  fontWeight?: string | number
  lineHeight?: string | number
  letterSpacing?: number
  textAlign?: string
  color?: string
}

export const commonStyle: ICommonStyle = {
  rotate: 0,
  opacity: 1,
  width: 200,
  height: 200,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '',
  letterSpacing: 0,
  textAlign: '',
  color: '',
}

export interface ICommonAttr {
  animations: any[]
  events: {
    [propName: string]: any
  }
  groupStyle: {
    [propName: string]: any
  } // 当一个组件成为 Group 的子组件时使用
  isLock: boolean // 是否锁定组件
}

export const commonAttr: ICommonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
}

export interface IComponentTab {
  type: string
  componentName: string
  label: string
  img: string
  components: IComponentTabComponent[]
  [propName: string]: any
}

export interface IComponentTabComponent {
  type: string
  componentName: string
  label: string
  img: string
  style?: ICommonStyle & {
    [propName: string]: any
  }
  propValue:
    | string
    | number
    | {
        [propName: string]: any
      }
  [propName: string]: any
}

export interface ICustomComponent extends IComponentTabComponent, ICommonAttr {
  [propName: string]: any
}

// export type ICustomComponent = IComponentTabComponent & ICommonAttr

export interface IComponentTabRender {
  type: string
  componentName: string
  label: string
  img: string
  components: ICustomComponent[]
  [propName: string]: any
}

const leftComponentList: IComponentTab[] = [
  {
    type: 'tab',
    componentName: 'BaseComponent',
    label: '基础组件',
    img: '',
    components: [
      {
        type: 'component',
        componentName: 'Text',
        label: '文本',
        style: {
          width: 200,
          height: 32,
        },
        img: '',
        propValue: '',
      },
      {
        type: 'component',
        componentName: 'Button',
        label: '按钮',
        img: '',
        propValue: '',
        style: {
          width: 88,
          height: 32,
        },
      },
      {
        type: 'component',
        componentName: 'Picture',
        label: '图片',
        img: '',
        propValue: '',
        style: {
          width: 200,
          height: 200,
        },
      },
    ],
  },
  {
    type: 'tab',
    componentName: 'GraphComponent',
    label: '图形组件',
    img: '',
    components: [
      {
        type: 'component',
        componentName: 'GraphLine',
        label: '折线图',
        img: '',
        propValue: {},
      },
    ],
  },
]

const renderComponentAreaData: IComponentTabRender[] = leftComponentList.map((tab) => {
  return {
    ...tab,
    components: tab.components.map((component) => {
      return {
        ...commonAttr,
        ...component,
        style: {
          ...commonStyle,
          ...component.style,
        },
      }
    }),
  }
})

export default renderComponentAreaData
