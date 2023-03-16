import React from 'react'

function Blogs({item}) {
    const dateFormat = new Date(item.addTime.seconds || item.addTime);
  return (
    <div className='blog'>
        <img src={item.imageURL} alt="" className="blog__img" />
        <div className="blog__content">
            <h3 className="blog__title">{item.title}</h3>
            <p className='blog__text'>
                {item.text.slice(0,50)}
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
}

export default Blogs