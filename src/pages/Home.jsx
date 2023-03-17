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
      <BackImage  className='main' backImg={backImg}>
          <div className="main__content">
              <div className="main__text">
                  <h1 className="main__text-title">Learn programming with us</h1>
              </div>
              <img src={learnImg} alt="" className="main__img" />
          </div>
      </BackImage>
      <CategoriesList/>
      
      <Blogs blogs={blogs}/>
          
       
    </>
  )
}

export default Home