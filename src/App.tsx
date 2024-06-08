import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './home/Home'
import DataStructures from './data_structures/DataStructures'
import { Stack } from './data_structures/stack/StackPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
       <Route path="/" element= {<Home/>} ></Route>
      <Route path="/data-structures">
      <Route index  element ={<DataStructures/>} />
        <Route path='stack' element= {<Stack/>} />
      </Route>

      <Route path="*" element={<h1>NOT FOUND</h1>} />


    </Routes>
  )
}

export default App
