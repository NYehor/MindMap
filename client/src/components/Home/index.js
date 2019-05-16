import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Solution from './Solution';
import Features from './Features';
import Form from './Form';
import Title  from './Title';


export default function Home() {
    return (
            <div>
                <Header/>
                <Title/>
                <Form/>
                <Solution/>
                <Features/>
                <Footer />
            </div>
     );
}