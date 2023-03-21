import React, { useContext } from 'react'
import { useParams } from 'react-router'
import { BlogContext } from '../context'
import Blogs from '../components/Blogs'
function CategoyPage() {
  const category = useParams().category
  const blogs = useContext(BlogContext).filter(item=> {
    return(
      item.category == category
    )
  })
  console.log(blogs);
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