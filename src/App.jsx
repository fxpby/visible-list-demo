import List from './components/list'
import './App.css'

function App() {
  const data = Array.from(new Array(200)).map((x, i) => ({
    id: i + 1,
    value: `item-${i + 1}`,
  }))
  const itemHeight = 50
  return (
    <>
      <List listData={data} itemHeight={itemHeight} />
    </>
  )
}

export default App
