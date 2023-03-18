import React, { useContext } from 'react'
import { BackImage } from '../styled/style'
import backImg from '../assets/category_page_background.jpg'
import { useParams } from 'react-router'
import { BlogContext } from '../context'
import Blogs from '../components/Blogs'
function AllBlogs() {
  const category = 'All Blogs'
  const blogs = useContext(BlogContext).filter(item=> {
    return(
      item.category !== 'news'
    )
  })
  console.log(blogs);
  return (
    <div className="category-page">
        <BackImage className='categoryPage' backImg={backImg}>
            <h1 className='categoryPage__title'>{category}</h1>
        </BackImage>
    <Blogs blogs={blogs}/>
    </div>
  )
}

export default AllBlogs