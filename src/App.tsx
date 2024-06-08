
import { Route, Routes } from 'react-router-dom'
import  Stack  from './data_structures/stack/Stack'
import  Home  from './home/Home'
import DataStructures from './data_structures/DataStructures'


function App() {


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
