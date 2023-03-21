import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { BlogContext } from '../context'

function LatestNews() {
  const news = useContext(BlogContext).filter(item=> {
    return (item.category == 'news')
  })
  console.log(news);
  return (
    <div className='lnews sidebar__padding'>
        <div className="lnews__title">
            Latest News
        </div>
        <div className="lnews__content">
            {
                news? (
                    news.map(item=> {
                        return (
                            <div className="lnews__item" key={item.id}>
                                <div className="lnews__item-title">
                                    <Link to={`/blogs/news/${item.id}`}>
                                        {item.title.slice(0,55)}...
                                    </Link>
                                </div>
                                <div className="lnews__item-date">

                                </div>
                            </div>
                        )
                    })
                ) : ''
            }
            <div className="lnews__all">
                <Link to='/blogs/news'>View all.</Link>
            </div>
        </div>
    </div>
  )
}

export default LatestNews