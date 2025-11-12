// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Landpage from './components/Landpage/Landpage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      <Landpage/>
    </div>
  )
}
export default App
