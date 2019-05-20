import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import MapsItem from './MapsItem';
import ContextMenu from './ContextMenu';

class MapsList extends Component {

  constructor() {
    super();

    this.state = {
      showContextMenu: false,
      contextMenu: { x: null, y: null },
      selectedMapId: null
    }
  
    this.listDOMRect = null;  
  }


  onToggleContextMenu = (mapId, coordX, coordY) => {
    console.log(mapId);
    const showContextMenu = this.state.showContextMenu;

    this.setState({
      showContextMenu: !showContextMenu,
      selectedMapId: mapId,
      contextMenu: { x: coordX, y: coordY }
    });
  }

  componentDidMount() {
    this.listDOMRect = this.listRef.getBoundingClientRect();
     
    document.addEventListener('click', (e) => {
      if (this.state.showContextMenu) {

      }
    });
  }

  componentDidUpdate() {
    this.listDOMRect = this.listRef.getBoundingClientRect();
  }

  render() {
    console.log(this.props);

    const { maps, match } = this.props;
    const { selectedMapId } = this.state;

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
                  onToggleContextMenu={this.onToggleContextMenu} />
              )}
            </ul>
          </section>
        )}

      {this.state.showContextMenu ? 
        <ContextMenu render={() => 
          <ul className='context-menu' style={{
              display: 'block',
              left: `${this.state.contextMenu && this.state.contextMenu.x + 20}px`,
              top: `${this.state.contextMenu && this.state.contextMenu.y}px`
          }}>
            <li><Link to={`${this.props.match.url}/${selectedMapId}`}>Edit</Link></li>
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