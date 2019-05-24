import React, { Component } from 'react';

import Solution from './features/Solution';
import Features from './features/Features';
import RegisterForm from './features/RegisterForm';
import LoginForm from './features/LoginForm';
import Title  from './features/Title';


export default function Home() {
    return (
        <div>
            <Title/>
            <div style={{width: '330px', margin: '0 0 0 100px'}}>
                <RegisterForm />
            </div>
            <Solution/>
            <Features/>
        </div>
     );
}