import { useRef } from 'react'
export default function List() {
  const ulRef = useRef(null)

  const handleClick = () => {
    let now = Date.now()
    const total = 10000

    for (let i = 0; i < total; i += 1) {
      const li = document.createElement('li')
      li.innerText = `item-${i + 1}`
      li.className = 'h-50'
      if (ulRef.current) {
        ulRef.current.appendChild(li)
      }
    }

    console.log('js run time => ', Date.now() - now)
    setTimeout(() => {
      console.log('total run time =>', Date.now() - now)
    }, 0)
  }

  return (
    <div className="m-10">
      <button onClick={() => handleClick()}>add</button>
      <ul ref={ulRef}></ul>
    </div>
  )
}
