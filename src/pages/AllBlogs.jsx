import React, { useContext } from 'react'
import { BackImage } from '../styled/style'
import { Context } from '../context'
import Blogs from '../components/Blogs'
function AllBlogs() {
  const category = 'All Blogs'
  const {state} = useContext(Context)
  const blogs = state.blogs.filter(item=> {
    return(
      item.category !== 'news'
    )
  })
  console.log(blogs);
  return (
    <div className="category-page">
        <BackImage className='categoryPage'>
            <h1 className='categoryPage__title'>{category}</h1>
        </BackImage>
    <Blogs blogs={blogs}/>
    </div>
  )
}

export default AllBlogs