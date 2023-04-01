import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getBlog } from '../base/getBlog'
import About from '../pages/About'
import CategoyPage from '../pages/CategoyPage'
import Home from '../pages/Home'
import SingleBlog from '../pages/SingleBlog'
import AddBlog from '../pages/AddBlog'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import AllBlogs from '../pages/AllBlogs'
import Footer from './Footer'
import Login from '../user/Login'
import Signup from '../user/SignUp'
import Error404 from '../pages/Error404'
import { Context } from '../context'
function Routing() {
  getBlog()
  const {state} = useContext(Context)
  const {userActive,blogs} = state
  return (
        <BrowserRouter>
        <Navbar/>
        <div className="container">
            <div className="main-menu">
              <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/blogs' element={<AllBlogs/>}/>
                  <Route path='/blogs/:category' element={<CategoyPage/>}/>
                  <Route path='blogs/:category/:id' element={<SingleBlog/>}/>
                  <Route path='/about' element={<About/>}/>
                  <Route path='/add-blog' element={userActive?<AddBlog/>: <Error404/>}/>
                  <Route path='/login' element={userActive? <Error404/> :<Login/>}/>
                  <Route path='/signup' element={userActive? <Error404/> :<Signup/>}/>
              </Routes>
            </div>
            <Sidebar/>
            
        </div>
        <Footer/>
        
        
        
    </BrowserRouter>
  )
}

export default Routing