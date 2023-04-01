import React, { useContext } from 'react'
import { useParams } from 'react-router'

import Blogs from '../components/Blogs'
import { Context } from '../context'
function CategoyPage() {
  const category = useParams().category
  const {state} = useContext(Context)
  const blogs = state.blogs.filter(item=> {
    return(
      item.category == category
    )
  })
  return (
    <div className="category-page">
        <div className='categoryPage'>
            <h1 className='categoryPage__title'>{category}</h1>
        </div>
    <Blogs blogs={blogs}/>
    </div>
  )
}

export default CategoyPage