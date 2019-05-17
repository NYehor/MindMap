import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <nav>
      <ul>
          <li>
            <Link to='/sign-in'>Sign in</Link>
          </li>
          <li>
            <Link to='/board'>Board</Link>
          </li>
          <li>
            <Link to='/sign-out'>Sign out</Link>
          </li>
      </ul>
    </nav>
  )
}
