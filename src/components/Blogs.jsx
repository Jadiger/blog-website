import React from 'react'
import { BackImage } from '../styled/style';
import backImg from '../assets/blogs_background.jpg'
import { Link } from 'react-router-dom';

function Blogs({blogs}) {
    
  return (
    <div className="blogs" backImg={backImg}>
        {
            
            blogs.length > 0 ? (
            <div className="blogs__list"> {
                blogs.map(item=> {
                    const dateFormat = new Date(item.addTime.seconds || item.addTime);
                    return (
                        <div className='blog' key={item.id}>
                            <img src={item.imageURL} alt="" className="blog__img" />
                            <div className="blog__content">
                                <div className="blog__category">
                                    <Link to={`/blogs/${item.category}`}>{item.category}</Link>
                                </div>
                                <div className="blog__title">
                                    <Link to={`/blogs/${item.category}/${item.id}`}>
                                        {item.title.slice(0,80)}...
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
            }</div>) : (
                <h2 style={{width : '100%', textAlign: 'center',grid: 'none'}}>
                    There are no blogs in this category
                </h2>
            )
        }
        
    </div>
  )
}

export default Blogs