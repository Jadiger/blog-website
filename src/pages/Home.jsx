import React, { useContext, useState } from 'react'
import { BlogContext } from '../context';
import Blogs from '../components/Blogs';
import { Link } from 'react-router-dom';
function Home() {
    // const [blogs,setBlogs] = useState([])
    const blogs = useContext(BlogContext).filter(item=> { return item.category !== 'news'}).slice(0,10)
  return (
    <>
      {/* <CategoriesList/> */}
      <div className="blogs__title">
          New Blogs
      </div>
      <Blogs blogs={blogs}/>
      <div className="blogs__all">
         <Link to='/blogs'>View all...</Link>
      </div>
       
    </>
  )
}

export default Home