import React, { useContext } from 'react'
import { BackImage } from '../styled/style'
import backImg from '../assets/category_page_background.jpg'
import { useParams } from 'react-router'
import { BlogContext } from '../context'
import Blogs from '../components/Blogs'
function News() {
  const category = useParams().category
  const blogs = useContext(BlogContext).filter(item=> {
    return(
      item.category == category
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


export default News