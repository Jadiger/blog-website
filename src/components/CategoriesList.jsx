import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { categories } from '../base/Categories'
import { BlogContext } from '../context'

function CategoriesList() {
  
  return (
    <div className='categories sidebar__padding'>
        <h2 className="categories__title">
            Categories
        </h2>
        <div className="categories__list">
            {
          categories.map((item,index)=> {
              const blogSize = useContext(BlogContext).filter(blog=> {
                  return (item.url == ('blogs/'+ blog.category))
              }).length
            return (
              <Link to={`/${item.url}`} key={index}>
                  
                  <div className='category'>
                      <h4 className='category__name'> {item.category}</h4>
                      <div className="category__size">
                        {blogSize}
                      </div>
                  </div>
              </Link>
            )
          })
        }
        </div>
    </div>
  )
}

export default CategoriesList