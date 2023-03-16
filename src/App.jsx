import { useState } from 'react'
import Routing from './components/Routing'
import './sass/main.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routing/>
    </>
  )
}

export default App
