import React from 'react';
import Logo from './Logo';
import GithubIcon from '../../SVG/github.svg';

export default function Footer() {
     return (
        <footer>
            <Logo />
            <ul className='footer-info'>
                <li>SpaceLegion team</li>
                <li>
                    <a className="team-link" href="https://github.com/NYehor/Procoder">
                        <GithubIcon /> 
                        <span>github repo</span>
                    </a>
                </li>
            </ul>
        </footer>
     );
}