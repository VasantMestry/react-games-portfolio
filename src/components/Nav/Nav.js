import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

function Nav() {

  const navStyles = {
    color: '#fff',
    textDecoration: 'none'
  }

  return (
    <nav className="mainNavbar">
      {/* <h1>Logo</h1> */}
      <ul className="navLinks">
        <Link
          to='/'
          style={navStyles}
        >
          <li>Homepage</li>
        </Link>
        <Link
          to="/todo"
          style={navStyles}
        >
          <li>To Do App</li>
        </Link>
        <Link
          to="/githubsearch"
          style={navStyles}
        >
          <li>Github Search</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Nav
