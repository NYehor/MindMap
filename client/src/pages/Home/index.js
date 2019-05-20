import React, { Component } from 'react';

import Solution from './features/Solution';
import Features from './features/Features';
import Form from './features/Form';
import Title  from './features/Title';


export default function Home() {
    return (
        <div>
            <Title/>
            <Form/>
            <Solution/>
            <Features/>
        </div>
     );
}