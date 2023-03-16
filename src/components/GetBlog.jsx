import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'

const GetBlog =({blogs,setBlogs})=>{
    useEffect(()=> {
        const q = query(
            collection(db,"blogs"),
            orderBy("addTime", "desc")
        )
        const unsub = onSnapshot(
            q,
            // orderBy("addTime"),
            (snapshot)=> {
                let list = []
                snapshot.docs.forEach((doc,index)=> {
                    list.push({id : doc.id, ...doc.data()})
                })
                setBlogs(list)
            },
            (error)=> {
                console.log(error);
            }
        )
        return ()=> {
            unsub()
        }
    },[]) 
    return (
        <div className='blogs'>
            <h2 className="blogs_title">
                Blogs
            </h2>
        {
            blogs.length > 0 ? (
                blogs.map(item=> {
                    const dateFormat = new Date(item.addTime.seconds || item.addTime);
                    // console.log(dateFormat);
                    // const date = dateFormat.getDate()
                    return (
                        <div className='blog' key={item.id}>
                           
                                <img className='blog_img' src={item.imageURL? item.imageURL :
                                    'https://neilpatel.com/wp-content/uploads/2017/08/blog.jpg'}/>

                                <div className="blog_info">
                                    <div className="blog_date">
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

                                    <h4 className='blog_title'> {item.title}</h4>
                                </div>
                            
                        </div>)
                })
            ) : ''
        }
    </div>
    )
}

export default GetBlog