import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import blogImg from '../assets/blog.jpg'


function Blogs({blogs}) {
    const [size,setSize] = useState(10)
    const path = useLocation().pathname
    function showMore() {
        setSize(size + 10)
    }
    console.log(path);
  return (
    <div className="blogs">
        {
            
            blogs.length > 0 ? (
            <div className="blogs__list"> {
                blogs.slice(0,size).map(item=> {
                    const dateFormat = new Date(item.addTime.seconds || item.addTime);
                    return (
                        <div className='blog' key={item.id}>
                            <img src={item.imgURLs[0] || blogImg} alt="" className="blog__img" />
                            <div className="blog__content">
                                <div className="blog__category">
                                    <Link to={`/blogs/${item.category}`}>{item.category}</Link>
                                </div>
                                <div className="blog__title">
                                    <Link to={`/blogs/${item.category}/${item.id}`}>
                                        {item.title.length > 80 ? item.title.slice(0,80)+'...' : item.title}
                                    </Link>
                                </div>
                    
                                <div className="blog__date">
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
                            
                        </div>
                    )
                })
                
            }
                {
                    (size < blogs.length && path != '/') ? (
                        <div className="blogs__more" onClick={showMore}>Show More</div>
                    ) : ''
                }
            </div>) : (
                <h2 style={{width : '100%', textAlign: 'center',grid: 'none'}}>
                    There are no blogs in this category
                </h2>
            )
        }
        
    </div>
  )
}

export default Blogs