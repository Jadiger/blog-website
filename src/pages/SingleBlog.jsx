import React, { useContext } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { BlogContext } from '../context'

function SingleBlog() {
  const {id,category} = useParams()
  const blog = useContext(BlogContext).filter(item=> {
    return (item.id == id)
  })[0]
  console.log(blog);
  return (
    blog? (
      <div className='sblog'>
            <div className="sblog__header">
              <div className="sblog__category">
                  <Link to={`/blogs/${category}`}>{blog.category}</Link>
              </div>
              <h1 className="sblog__title">
                {blog.title}
              </h1>
              
            </div>
            <div className="sblog__content">
                <img src={blog.imageURL} className="sblog__img" />
                <p className="sblog__text">
                    {blog.text}
                </p>
            </div>
      </div>
    ) : ''
  )
}

export default SingleBlog