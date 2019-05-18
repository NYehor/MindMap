import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Plus from '../../../SVG/plus-icon.svg';

const Sidebar = ({path}) => {

  return (
    <Fragment>

      <button className='btn-map-creation'> 
        <Plus /> 
        <span>Create map</span>
      </button>

      <nav>
        <ul className='board-nav'>

          <li className='board-nav__item'>
            <NavLink 
              to={`${path}/my-maps`} 
              activeClassName='active-board-link'>
                My maps
            </NavLink>
          </li>

          <li className='board-nav__item'>
            <NavLink 
              to={`${path}/sharable`} 
              activeClassName='active-board-link'>
                Sharable
            </NavLink>
          </li>

          <li className='board-nav__item'>
            <NavLink  
              to={`${path}/trash`} 
              activeClassName='active-board-link'>
                Trash
            </NavLink>
          </li>

        </ul>
      </nav>

    </Fragment>
  )
}

export default Sidebar;
