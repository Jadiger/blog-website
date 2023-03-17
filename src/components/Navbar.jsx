import React, { useContext, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { navList } from '../base/NavLinks';
import { BlogContext } from '../context'

function Navbar({setBlog}) {
    const myBlog = useContext(BlogContext)
    // console.log(myBlog);
    const navRef = useRef('')
    const [navActive,setNavActive] = useState(false)
    const [burgerMenu, setBurgerMenu] = useState(false)
    window.addEventListener('scroll', ()=> {
      if (pageYOffset > (navRef.current.clientHeight ? navRef.current.clientHeight : 80)) {
        setNavActive(true)
      } else {
        setNavActive(false)
      }
    })

  return (
    <nav className={`nav ${navActive ? 'nav_active' : ''}`} ref={navRef}>
        <div
            className={`burger_menu ${burgerMenu? 'burger_menu_active': ''}`}
            onClick={()=> {
                setBurgerMenu(!burgerMenu)
            }}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
        <h2 className="nav__logo">IT BLOG</h2>
        <ul className={`nav__links ${burgerMenu ? 'nav__links_active' : ''}`}
            onClick={()=> {
              setBurgerMenu(false)
            }}
        >
            {
              navList.map(item=> {
                return (
                  <li className="nav__link" key={item.id}>
                      <NavLink to={item.url}>{item.name}</NavLink>
                  </li>
                )
              })
            }
        </ul>
        <div className="nav__details">
            <div className="nav__detail">
                <Link to='/add-blog'>
                  Add Blog
                </Link>
            </div>
            <div className="nav__detail">
                <Link to='/login'>
                  Login
                </Link>
            </div>
        </div>
    </nav>
  )
}

export default Navbar