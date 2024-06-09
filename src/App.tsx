
import { Link, Route, Routes } from 'react-router-dom'
import Stack from './data_structures/stack/Stack'
import Home from './home/Home'
import DataStructures from './data_structures/DataStructures'
import config from './config'


function App() {


  return (
    <>
      <header className='flex flex-row items-center justify-center border-2 border-white'>
        <div id='logo'>
          <img src="#" alt="logo" />
        </div>
        <nav className='top-nav'>

          <ul>

            {Object.entries(config.links).map(([key, value]) => {

              return (

                <li>
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
        </Route>

        <Route path="*" element={<h1>NOT FOUND</h1>} />


      </Routes></>
  )
}

export default App
