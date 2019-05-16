import React, { Component } from 'react';

export default function Features () {
        return (
                 <section className="features ">
                    <h2 className="title"> App Features</h2>
                    <div className="container">
                    <ul className="features-list">
                        <li className="features-item">
                             <i class="features-icon"> 
                                    <svg width="45px" height="45px" viewBox="0 0 459 459" >
                                        <path d="M124.95,181.05l-35.7,35.7L204,331.5l255-255l-35.7-35.7L204,260.1L124.95,181.05z M408,408H51V51h255V0H51
                                            C22.95,0,0,22.95,0,51v357c0,28.05,22.95,51,51,51h357c28.05,0,51-22.95,51-51V204h-51V408z"/>
                                    </svg>
                                </i>
                                ability to insert code snippets into map
                        </li>
                        <li class="features-item">
                             <i class="features-icon">
                                <svg width="45px" height="45px" viewBox="0 0 459 459"> 
                                    <path d="M124.95,181.05l-35.7,35.7L204,331.5l255-255l-35.7-35.7L204,260.1L124.95,181.05z M408,408H51V51h255V0H51 C22.95,0,0,22.95,0,51v357c0,28.05,22.95,51,51,51h357c28.05,0,51-22.95,51-51V204h-51V408z" /></svg> 
                            </i>
                            supporting code formatting for almost all languages 
                        </li>
                        <li class="features-item">
                            <i class="features-icon"><svg width="45px" height="45px" viewBox="0 0 459 459" >
                                    <path d="M124.95,181.05l-35.7,35.7L204,331.5l255-255l-35.7-35.7L204,260.1L124.95,181.05z M408,408H51V51h255V0H51
                    C22.95,0,0,22.95,0,51v357c0,28.05,22.95,51,51,51h357c28.05,0,51-22.95,51-51V204h-51V408z" />
                                </svg>
                            </i>maps sharing with your codemates / colleagues
                         </li>
                        <li class="features-item">
                            <i class="features-icon">
                            <svg width="45px" height="45px" viewBox="0 0 459 459">
                                    <path d="M124.95,181.05l-35.7,35.7L204,331.5l255-255l-35.7-35.7L204,260.1L124.95,181.05z M408,408H51V51h255V0H51 C22.95,0,0,22.95,0,51v357c0,28.05,22.95,51,51,51h357c28.05,0,51-22.95,51-51V204h-51V408z" />
                             </svg>
                            </i>maps grouping by categories </li>
                    </ul>
                </div>
        </section>
        );
}