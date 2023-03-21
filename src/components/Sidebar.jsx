import React from 'react'
import CategoriesList from './CategoriesList'
import LatestNews from './LatestNews'

function Sidebar() {
  return (
    <div className='sidebar'>
        <CategoriesList/>
        <LatestNews/>
    </div>
  )
}

export default Sidebar