import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Navbar({ auth: {logIn, user} }) {
  return (
    <nav>
      <ul className='navigation'>
      
          {logIn && 
            <li className='navigation__item'>
              <NavLink to='/board' activeClassName='navigation__link--active'>Board</NavLink>
            </li>
          }

          {!logIn &&
            <li className='navigation__item'>
              <NavLink to='/sign-in' activeClassName='navigation__link--active'>Sign in</NavLink>
            </li>
          }

          {logIn && 
            <li className='navigation__item'>
              <NavLink to='/sign-out' activeClassName='navigation__link--active'>Sign out</NavLink>
            </li>
          }

      </ul>
    </nav>
  )
}
