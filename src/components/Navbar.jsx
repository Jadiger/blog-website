import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { navList } from '../base/NavLinks';
import { BlogContext } from '../context'
import Loading from './Loading';

function Navbar({userActive,setUserActive,alert,alertClass}) {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  useEffect(()=> {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
  },[pathname])
    const myBlog = useContext(BlogContext)
    const navRef = useRef('')
    const [navActive,setNavActive] = useState(false)
    const [burgerMenu, setBurgerMenu] = useState(false)
    window.addEventListener('scroll', ()=> {
      if (pageYOffset > (navRef.current.clientHeight ? navRef.current.clientHeight : 60)) {
        setNavActive(true)
      } else {
        setNavActive(false)
      }
    })

  return (
    <nav className={`nav ${navActive ? 'nav_active' : ''}`} ref={navRef}>
      {myBlog.length> 0 ?'': <Loading/>}
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
            {
              userActive ? (
                <li className='nav__link' key='addblog123'>
                <NavLink to='/add-blog'>
                    Add Blog
                </NavLink>
            </li>
              ) : ''
            }
        </ul>
        <div className="nav__details">
            <div className="nav__detail">
                {
                userActive ? (
                  <span className="log-out" onClick={()=> {
                  window.localStorage.removeItem('useruid')
                  setUserActive(null)
                  navigate('/')
                }}>
                  Log Out
                </span>
                ) :

                <Link to='/login'>
                  Login
                </Link>
                }
            </div>
        </div>
        <div className={`alert ${alertClass}`}>
          {alert}
        </div>
    </nav>
  )
}

export default Navbar