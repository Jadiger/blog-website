import React from 'react'
import { BackImage } from '../styled/style';
import backImg from '../assets/blogs_background.jpg'
import { Link } from 'react-router-dom';

function Blogs({blogs}) {
    
  return (
    <div className="blogs" backImg={backImg}>
          <div className="blogs__title">
                Blogs
          </div>
        {
            
            blogs.length > 0 ? (
            <div className="blogs__list"> {
                blogs.map(item=> {
                    const dateFormat = new Date(item.addTime.seconds || item.addTime);
                    return (
                        <div className='blog' key={item.id}>
                            <img src={item.imageURL} alt="" className="blog__img" />
                            <div className="blog__content">
                                <Link to={`/blogs/${item.category}/${item.id}`}>
                                    <h3 className="blog__title">{item.title}</h3>
                                </Link>
                                <p className='blog__text'>
                                    {item.text.slice(0,70)}...
                                </p>
                            </div>
                            <div className="blog__footer">
                                <div className="blog__date">
                                    <span>
                                        {dateFormat.getHours()>9 ? `${dateFormat.getHours()} ` :`0${dateFormat.getHours()} `} :
                                        {dateFormat.getMinutes()> 9 ? ` ${dateFormat.getMinutes()}  ` : `                                                                       0${dateFormat.getMinutes()}  `}
                                    </span> 
                                    <span>
                                        {dateFormat.getDate()}.
                                        {(dateFormat.getMonth() + 1) < 9 ? `0${dateFormat.getMonth() + 1}`
                                        : dateFormat.getMonth()}.
                                        {dateFormat.getFullYear()}
                                    </span>
                                </div>
                                <button className="blog__category">
                                    {item.category}
                                </button>
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