import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = ({ logIn }) => {
  return (
    <nav>
      <ul className='navigation'>
      
          {logIn && 
            <Fragment>
              <li className='navigation__item'>
                <NavLink to='/board' activeClassName='navigation__link--active'>Board</NavLink>
              </li>
              <li className='navigation__item'>
                <NavLink to='/profile' activeClassName='navigation__link--active'>Profile</NavLink>
              </li>
            </Fragment>
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

export default Navbar;
