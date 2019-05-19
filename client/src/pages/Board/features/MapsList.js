import React, { Component, Fragment } from 'react';
import MapsItem from './MapsItem';
import ContextMenu from './ContextMenu';

export default class MapsList extends Component {

  constructor() {
    super();

    this.state = {
      showContextMenu: false
    }
  
    this.listDOMRect = null;  
  }


  onToggleContextMenu = () => {
    const showContextMenu = this.state.showContextMenu;
    this.setState({
      showContextMenu: !showContextMenu
    });
  }

  componentDidMount() {
    this.listDOMRect = this.listRef.getBoundingClientRect();
  }
  componentDidUpdate() {
    this.listDOMRect = this.listRef.getBoundingClientRect();
  }

  render() {
    console.log(this.listDOMRect);

    const { maps } = this.props;
    console.log([...maps.keys()]);

    return (
      <Fragment>
        {[...maps.keys()].map((category, index) => 
          <section key={index} className='maps-list' ref={el => (this.listRef = el)} >
            <h3 className='maps-list__category'>{category}</h3>
            <ul className='maps-list__list'>
              {maps.get(category).map(item => 
                <MapsItem 
                  key={item.id} 
                  map={item} 
                  onToggleContextMenu={this.onToggleContextMenu} />)}
            </ul>
          </section>
        )}

      {this.state.showContextMenu ? 
        <ContextMenu render={() => 
          <ul style={{display: 'block'}}>
            <li>Edit</li>
            <li>Share</li>
            <li>Move to trash</li>
          </ul>
        } /> 
      : null}
      </Fragment>
    )
  }
}
