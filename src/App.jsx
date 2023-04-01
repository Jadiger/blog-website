import { useState } from 'react'
import Routing from './components/Routing'
import Provider from './context'
import './sass/main.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider>
      <Routing/>
    </Provider>
  )
}

export default App
