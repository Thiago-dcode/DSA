
import { Link, Route, Routes } from 'react-router-dom'
import Stack from './data_structures/linear/stack/Stack'
import Home from './home/Home'
import DataStructures from './data_structures/DataStructures'
import { globalConfig } from './config'
import Queue from './data_structures/linear/queue/Queue'


function App() {


  return (
    <>
      <header className='flex flex-row items-center justify-between sticky top-0 z-50  py-8'>
        <div className='border-2 border-white' id='logo'>
          <img src="#" alt="logo" />
        </div>
        <nav className='top-nav w-full flex items-center justify-center'>

          <ul className='flex items-center  border-2 border-white justify-evenly gap-10 px-10 uppercase'>

            {Object.entries(globalConfig.links).map(([key, value]) => {

              return (

                <li key={key + value}>
                  <Link to={`${key}`}>{key}</Link>

                </li>
              )
            })}
          </ul>

        </nav>

      </header>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/data-structures">
          <Route index element={<DataStructures />} />
          <Route path='stack' element={<Stack />} />
          <Route path='queue' element={<Queue />} />
          <Route path='array' element={<Array />} />
        </Route>

        <Route path="*" element={<h1>NOT FOUND</h1>} />


      </Routes></>
  )
}

export default App
