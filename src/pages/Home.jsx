import React, { useContext, useState } from 'react'
import CategoriesList from '../components/CategoriesList'
import GetBlog from '../components/GetBlog';
import learnImg from '../assets/learn.png';
import { BlogContext } from '../context';
import Blogs from '../components/Blogs';
import { BackImage } from '../styled/style';
import backImg from '../assets/home_background.jpg'
function Home() {
    // const [blogs,setBlogs] = useState([])
    const blogs = useContext(BlogContext)
    console.log(backImg);
  return (
    <>
      {/* <CategoriesList/> */}
      <div className="blogs__title">
          New Blogs
      </div>
      <Blogs blogs={blogs}/>
          
       
    </>
  )
}

export default Home