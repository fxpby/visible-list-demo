import { useRef, useState, useEffect } from 'react'
import './index.less'
export default function List(prop) {
  const { listData = [], itemHeight = 0 } = prop
  const containerRef = useRef(null)

  const [listInfo, setListInfo] = useState({
    // 可视区高度
    viewportHeight: 0,
    // 偏移量
    startOffset: 0,
    // 起始索引
    start: 0,
    // 结束索引
    end: 0,
  })

  const [listHeight, setListHeight] = useState(0)

  useEffect(() => {
    console.log('%c Line:40 🥚 listData', 'color:#ed9ec7', listData)
    if (listData.length) {
      setListHeight(listData.length * itemHeight)
    }
  }, [listData, itemHeight])

  // 可显示的列表项数量
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    setVisibleCount(listInfo.viewportHeight / itemHeight)
  }, [listInfo.viewportHeight, itemHeight])

  // 偏移量
  const [transformOffset, setTransformOffset] = useState('')
  useEffect(() => {
    setTransformOffset(`translate3d(0, ${listInfo.startOffset}px, 0)`)
  }, [listInfo.startOffset])

  // 实际显示的数据
  const [visibleData, setVisibleData] = useState([])

  useEffect(() => {
    console.log('%c Line:50 🧀🧀🧀 useEffect', 'color:#42b983', listData)
    setVisibleData(
      listData.slice(listInfo.start, Math.min(listInfo.end, listData.length)),
    )
  }, [listData, listInfo.start, listInfo.end])

  useEffect(() => {
    if (containerRef.current) {
      setListInfo((prev) => {
        return {
          ...prev,
          viewportHeight: containerRef.current.clientHeight,
          end: prev.start + visibleCount,
        }
      })
    }
  }, [visibleCount])

  const handleScroll = () => {
    // 当前偏移量
    const scrollTop = containerRef.current.scrollTop
    console.log('%c Line:75 🥚 scrollTop', 'color:#ffdd4d', scrollTop)
    setListInfo((prev) => {
      return {
        ...prev,
        start: Math.floor(scrollTop / itemHeight),
        end: prev.start + visibleCount,
        startOffset: scrollTop - (scrollTop % itemHeight),
      }
    })
    console.log('%c Line:83 🥐 ListInfo', 'color:#93c0a4', listInfo)
  }

  return (
    <div className="m-10">
      {/* 外层容器 */}
      <div
        className="list-container"
        ref={containerRef}
        onScroll={() => handleScroll()}>
        {/* 高度容器，列表总高度 */}
        <div
          className="list-height"
          style={{ height: `${listHeight}px` }}></div>
        {/* 列表容器，实际列表项 */}
        <div className="list" style={{ transform: transformOffset }}>
          {visibleData.map((x) => (
            <div
              className="item"
              key={x.id}
              style={{
                height: `${itemHeight}px`,
                lineHeight: `${itemHeight}px`,
              }}>
              {x.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
