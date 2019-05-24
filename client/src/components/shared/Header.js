import React from 'react'
import Logo from './Logo';
import Navbar from './Navbar';


export default function Header({ auth }) {
  return (
    <header>
      <Logo />
      <Navbar auth={auth} />
    </header>
  )
}
