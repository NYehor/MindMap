import React from 'react';
import CheckedIcon from '../../../SVG/checked.svg';

export default function Features () {
    return (
        <section className="features">
            <h2 className="title">App Major Features</h2>
            <div className="container">

                <ul className="features-list">
                    <li className="features-list__item">
                        <CheckedIcon />
                        Ability to insert code snippets into map
                    </li>
                    <li className="features-list__item">
                        <CheckedIcon />
                        Support code formatting for all languages 
                    </li>
                    <li className="features-list__item">
                        <CheckedIcon />
                        Share maps with your codemates
                    </li>
                    <li className="features-list__item">
                        <CheckedIcon />
                        Group maps by categories 
                    </li>
                </ul>

            </div>
    </section>
    );
}