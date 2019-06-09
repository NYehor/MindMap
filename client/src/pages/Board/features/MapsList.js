import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import MapsItem from './MapsItem';
import ContextMenu from './ContextMenu';

class MapsList extends Component {

  constructor() {
    super();

    this.state = {
      showContextMenu: false,
      coord: { x: '', y: '' },
      selectedMapId: null
    }
  
  }

  onToggleContextMenu = (mapId, coordX, coordY) => {
    console.log(mapId);
    const showContextMenu = this.state.showContextMenu;

    this.setState({
      showContextMenu: !showContextMenu,
      selectedMapId: mapId,
      coord: { x: coordX, y: coordY }
    });
  }

  componentDidMount() {     
    // document.addEventListener('click', (e) => {});
  }

  render() {
    const { maps, match } = this.props;
    const { selectedMapId, coord } = this.state;

    console.log([...maps.keys()]);

    return (
      <Fragment>
        {[...maps.keys()].map((category, index) => 
          <section key={index} className='maps-list' >
            <h3 className='maps-list__category'>{category}</h3>
            <ul className='maps-list__list'>
              {maps.get(category).map(item => 
                <MapsItem 
                  key={item.id} 
                  map={item} 
                  onToggleContextMenu={this.onToggleContextMenu} />
              )}
            </ul>
          </section>
        )}

      {this.state.showContextMenu ? 
        <ContextMenu render={() => 
          <ul className='context-menu' 
              style={{
                display: 'block',
                left: `${coord && coord.x + 10}px`,
                top: `${coord && coord.y + window.scrollY}px`
          }}>
            <li><Link to={`${match.url}/${selectedMapId}`}>Edit</Link></li>
            <li>Share</li>
            <li>Move to trash</li>
          </ul>
        } /> 
      : null}
      </Fragment>
    )
  }
}


export default withRouter(MapsList);