import React, { useContext, useState } from 'react'
import CategoriesList from '../components/CategoriesList'
import GetBlog from '../components/GetBlog';
import learnImg from '../assets/learn.png';
import { BlogContext } from '../context';
import Blogs from '../components/Blogs';
function Home() {
    // const [blogs,setBlogs] = useState([])
    const blogs = useContext(BlogContext)
  return (
    <>
      <main className='main'>
          <div className="main__content">
              <div className="main__text">
                  <h1 className="main__text-title">Learn programming with us</h1>
              </div>
              <img src={learnImg} alt="" className="main__img" />
          </div>
      </main>
      <CategoriesList/>
      <div className="blogs">
          <div className="blogs__list">
            {
            blogs ? blogs.map(item=> {
              return (
                <Blogs item={item} key={item.id}/>
              )
            }) : ''
          }
          </div>
      </div>
    </>
  )
}

export default Home