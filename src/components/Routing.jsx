import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getBlog } from '../base/getBlog'
import { BlogContext } from '../context'
import About from '../pages/About'
import CategoyPage from '../pages/CategoyPage'
import Home from '../pages/Home'
import SingleBlog from '../pages/SingleBlog'
import CategoriesList from './CategoriesList'
import Navbar from './Navbar'

function Routing() {
    const [blog,setBlog] = useState([])
    getBlog(setBlog)
  return (
    <BlogContext.Provider value={blog}>
        <BrowserRouter>
        <Navbar setBlog={setBlog}/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/blogs/:category' element={<CategoyPage/>}/>
            <Route path='blogs/:category/:id' element={<SingleBlog/>}/>
            <Route path='/about' element={<About/>}/>
        </Routes>
    </BrowserRouter>
    </BlogContext.Provider>
  )
}

export default Routing