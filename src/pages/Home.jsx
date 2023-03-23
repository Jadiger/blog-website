import React, { useContext, useState } from 'react'
import { BlogContext } from '../context';
import Blogs from '../components/Blogs';
import { Link } from 'react-router-dom';
function Home() {
  const blogs = useContext(BlogContext).filter(item=> { return item.category !== 'news'}).slice(0,10)
  const randomBlog = blogs.length> 0 ? blogs[Math.floor(Math.random()*(blogs.length))] : false
  // console.log(randomNum);
  return (
    <>
      {
        randomBlog ? (
            <div className="randomBlog">
                <img src={randomBlog.imageURL}/>
                <div className="randomBlog__info">
                    <div className="randomBlog__category">
                        <Link to={`/blogs/${randomBlog.category}`}>
                            {randomBlog.category}
                        </Link>
                    </div>
                    <div className="randomBlog__title">
                        <Link to={`/blogs/${randomBlog.category}/${randomBlog.id}`}>
                            {randomBlog.title}
                        </Link>
                    </div>
                </div>
            </div>
        ) : ''
      }

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