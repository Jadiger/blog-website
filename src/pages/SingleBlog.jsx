import { ref, remove } from 'firebase/database'
import { deleteDoc, doc } from 'firebase/firestore'
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { BlogContext } from '../context'
import { db } from '../firebase/config'
import deleteIcon from '../assets/delete.png'

function SingleBlog({userActive,setAlert,setAlertClass}) {
  const {id,category} = useParams()
  const navigate = useNavigate()
  const blog = useContext(BlogContext).filter(item=> {
    return (item.id == id)
  })[0]
  const dateFormat = new Date(blog?.addTime?.seconds || blog?.addTime);

  function handleDelete(blog) {
    deleteDoc(doc(db, 'blogs' ,`${blog.id}`))
    setAlert('Blog Deleted!')
    setAlertClass('alert__success')
    navigate('/')
    setTimeout(()=> {
      setAlert('')
      setAlertClass('')
    },2000)
  }
  return (
    blog? (
      <div className='sblog'>
            <div className="sblog__header">
                
              <div className="sblog__info">
                  <div className="sblog__category">
                      <Link to={`/blogs/${category}`}>{blog.category}</Link>
                  </div>

                  <div className="sblog__date">
                      <span>
                          {dateFormat.getDate()}.
                          {(dateFormat.getMonth() + 1) < 9 ? `0${dateFormat.getMonth() + 1}`
                          : dateFormat.getMonth()}.
                          {dateFormat.getFullYear()},
                      </span>
                      <span>
                          {dateFormat.getHours()>9 ? `${dateFormat.getHours()} ` :`0${dateFormat.getHours()} `} :
                          {dateFormat.getMinutes()> 9 ? ` ${dateFormat.getMinutes()}  ` : `                                                                       0${dateFormat.getMinutes()}  `}
                      </span> 
                  </div>
              </div>
              <h3 className="sblog__title">
                {blog.title}
                {
                  userActive ? (
                  <div className='sblog__delete'
                      onClick={()=> {
                        handleDelete(blog)
                      }}
                  >
                      <img src={deleteIcon}/>
                  </div>
            ) : ''
                }
              </h3>
              
            </div>
            <div className="sblog__content">
               
                <p className="sblog__text" dangerouslySetInnerHTML={{__html : blog.text}}>
                    
                </p>
            </div>
            
      </div>
    ) : ''
  )
}

export default SingleBlog