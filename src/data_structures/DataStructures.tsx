import React from 'react'
import config from '../config'
import { Link } from 'react-router-dom'

export default function DataStructures() {
  return (
    <nav>
      <ul>
       {
        config.links['data-structures'].map(ds =>{

          return(
            <li>
              <Link to={ds}>{ds}</Link>
            </li>
          )
        })
       }
      </ul>
    </nav>
  )
}
