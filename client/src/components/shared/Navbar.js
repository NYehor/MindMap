import React from 'react'
import { Link, NavLink } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <nav>
      <ul className='navigation'>
      
          <li className='navigation__item'>
            <NavLink to='/board' activeClassName='navigation__link--active'>Board</NavLink>
          </li>

          <li className='navigation__item'>
            <NavLink to='/sign-in' activeClassName='navigation__link--active'>Sign in</NavLink>
          </li>

          <li className='navigation__item'>
            <NavLink to='/sign-out' activeClassName='navigation__link--active'>Sign out</NavLink>
          </li>

      </ul>
    </nav>
  )
}
