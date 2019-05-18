import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <nav>
      <ul className='navigation'>
      
          <li className='navigation__item'>
            <Link to='/board'>Board</Link>
          </li>

          <li className='navigation__item'>
            <Link to='/sign-in'>Sign in</Link>
          </li>

          <li className='navigation__item'>
            <Link to='/sign-out'>Sign out</Link>
          </li>

      </ul>
    </nav>
  )
}
