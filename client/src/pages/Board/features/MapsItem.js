import React, { Component } from 'react';
import TreePlaceholder from '../../../SVG/tree-placeholder.svg';

export default class MapsItem extends Component {


    render() {        
        const {map, onToggleContextMenu} = this.props;

        return (
            <li className='maps-list__item'>
                <TreePlaceholder />
                <div className='maps-list__name'>
                    <span>{map.name}</span>
                    <div className='context-menu--btn' onClick={onToggleContextMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </li>
        )
    }
}
