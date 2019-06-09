import React from 'react'
import Logo from './Logo';
import Navbar from './Navbar';


export default function Header({ logIn }) {
  return (
    <header>
      <Logo />
      <Navbar logIn={logIn} />
    </header>
  )
}
