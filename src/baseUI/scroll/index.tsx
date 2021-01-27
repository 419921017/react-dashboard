import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo } from 'react'
import BScroll from 'better-scroll'
import styled from 'styled-components'
import { useDebounceFn } from 'ahooks'
// import { debounce } from '../../api/utils'

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`

export const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`

// 下为问题代码，以此为鉴
// useEffect(() => {
//   if(bScroll) return;
//   const scroll = new BScroll(scrollContaninerRef.current, {
//     scrollX: direction === "horizental",
//     scrollY: direction === "vertical",
//     probeType: 3,
//     click: click,
//     bounce:{
//       top: bounceTop,
//       bottom: bounceBottom
//     }
//   });
//   setBScroll(scroll);
//   if(pullUp) {
//     scroll.on('scrollEnd', () => {
//       //判断是否滑动到了底部
//       if(scroll.y <= scroll.maxScrollY + 100){
//         pullUp();
//       }
//     });
//   }
//   if(pullDown) {
//     scroll.on('touchEnd', (pos) => {
//       //判断用户的下拉动作
//       if(pos.y > 50) {
//         debounce(pullDown, 0)();
//       }
//     });
//   }

//   if(onScroll) {
//     scroll.on('scroll', (scroll) => {
//       onScroll(scroll);
//     })
//   }

//   if(refresh) {
//     scroll.refresh();
//   }
//   return () => {
//     scroll.off('scroll');
//     setBScroll(null);
//   }
//   // eslint-disable-next-line
// }, []);
const Scroll = forwardRef<any, IScroll>((props, ref) => {
  const [bScroll, setBScroll] = useState<BScroll | null>()

  const scrollContaninerRef = useRef<any>()

  const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props

  const { pullUp, pullDown, onScroll } = props

  const pullUpDebounceFn = useDebounceFn(pullUp, { wait: 500 })
  const pullDownDebounceFn = useDebounceFn(pullDown, { wait: 500 })
  const pullUpDebounce = pullUpDebounceFn.run
  const pullDownDebounce = pullDownDebounceFn.run
  // const pullUpDebounce = useMemo(() => {
  //   // return debounce(pullUp, 500)
  //   return pullUpDebounceFn.run()
  // }, [pullUp])

  // const pullDownDebounce = useMemo(() => {
  //   return pullDownDebounceFn.run()
  //   // return debounce(pullDown, 500)
  // }, [pullDown])

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      probeType: 3,
      click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    })
    setBScroll(scroll)
    return () => {
      setBScroll(null)
    }
  }, [])

  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', onScroll)
    return () => {
      bScroll.off('scroll', onScroll)
    }
  }, [onScroll, bScroll])

  useEffect(() => {
    if (!bScroll || !pullUp) return
    const handlePullUp = () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce()
      }
    }
    bScroll.on('scrollEnd', handlePullUp)
    return () => {
      bScroll.off('scrollEnd', handlePullUp)
    }
  }, [pullUp, pullUpDebounce, bScroll])

  useEffect(() => {
    if (!bScroll || !pullDown) return
    const handlePullDown = (pos: any) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce()
      }
    }
    bScroll.on('touchEnd', handlePullDown)
    return () => {
      bScroll.off('touchEnd', handlePullDown)
    }
  }, [pullDown, pullDownDebounce, bScroll])

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
      return null
    },
    getBScroll() {
      if (bScroll) {
        return bScroll
      }
      return null
    },
  }))

  const PullUpdisplayStyle = pullUpLoading ? { display: '' } : { display: 'none' }
  const PullDowndisplayStyle = pullDownLoading ? { display: '' } : { display: 'none' }

  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={PullUpdisplayStyle}>loading...</PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={PullDowndisplayStyle}>loading...</PullDownLoading>
    </ScrollContainer>
  )
})

interface IScroll {
  direction: 'vertical' | 'horizental'
  click: boolean
  refresh: boolean
  onScroll: () => void
  pullUpLoading: boolean
  pullDownLoading: boolean
  pullUp: () => void
  pullDown: () => void
  bounceTop: boolean // 是否支持向上吸顶
  bounceBottom: boolean // 是否支持向下吸顶
}

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: () => {},
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: () => {},
  pullDown: () => {},
  bounceTop: true,
  bounceBottom: true,
}

export default Scroll
