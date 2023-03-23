import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getBlog } from '../base/getBlog'
import { BlogContext } from '../context'
import About from '../pages/About'
import CategoyPage from '../pages/CategoyPage'
import Home from '../pages/Home'
import SingleBlog from '../pages/SingleBlog'
import AddBlog from '../pages/AddBlog'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import News from '../pages/News'
import AllBlogs from '../pages/AllBlogs'
import Footer from './Footer'
import Login from '../user/Login'
import Signup from '../user/SignUp'
import Error404 from '../pages/Error404'
function Routing() {
    const [blog,setBlog] = useState([])
    const [userActive,setUserActive] = useState(null)
    getBlog(setBlog)
  return (
    <BlogContext.Provider value={blog}>
        <BrowserRouter>
        <Navbar userActive={userActive} setUserActive={setUserActive}/>
        <div className="container">
            <div className="main-menu">
              <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/' element={<News/>}/>
                  <Route path='/blogs' element={<AllBlogs/>}/>
                  <Route path='/blogs/:category' element={<CategoyPage/>}/>
                  <Route path='blogs/:category/:id' element={<SingleBlog userActive={userActive}/>}/>
                  <Route path='/about' element={<About/>}/>

                  <Route path='/add-blog' element={userActive? <AddBlog/> : ''}/>
                  <Route path='/login' element={userActive? <Error404/> :
                      <Login userActive={userActive} setUserActive={setUserActive}/>}/>
                  <Route path='/signup' element={userActive? <Error404/> : <Signup/>}/>
              </Routes>
            </div>
            <Sidebar/>
            
        </div>
        <Footer/>
        
        
        
    </BrowserRouter>
    </BlogContext.Provider>
  )
}

export default Routing