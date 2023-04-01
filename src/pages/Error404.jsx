import React from 'react'
import { Link } from 'react-router-dom'
import error from '../assets/404.jpg'
function Error404() {
  return (
    <div className='error_page'>
        <img src={error}/>
        <Link to='/' className="go_home">
            Go To HomePage
        </Link>
    </div>
  )
}

export default Error404