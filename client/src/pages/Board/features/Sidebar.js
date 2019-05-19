import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../../../components/shared/Modal';
import MapCreation from './MapCreation';
import Plus from '../../../SVG/plus-icon.svg';

export default class Sidebar extends Component {

  state = {
    showModal: false
  }

  toggeleModal = () => {
    const showModal = this.state.showModal;
    this.setState({
      showModal: !showModal
    });
  }

  render() {
    const { path } = this.props;
    const { showModal } = this.state;

    return (
      <Fragment>

        <button className='btn-map-creation' onClick={this.toggeleModal}> 
          <Plus /> 
          <span>Create map</span>
        </button>

        <nav>
          <ul className='board-nav'>

            <li className='board-nav__item'>
              <NavLink 
                to={`${path}/my-maps`} 
                activeClassName='active-board-link'>
                  My maps
              </NavLink>
            </li>

            <li className='board-nav__item'>
              <NavLink 
                to={`${path}/sharable`} 
                activeClassName='active-board-link'>
                  Sharable
              </NavLink>
            </li>

            <li className='board-nav__item'>
              <NavLink  
                to={`${path}/trash`} 
                activeClassName='active-board-link'>
                  Trash
              </NavLink>
            </li>

          </ul>
        </nav>

        {showModal ? <Modal onClose={this.toggeleModal} 
                            content={<MapCreation />}
                            title={<h3>Map Creation</h3>} />                    
                    : null
        }
    </Fragment>
    )
  }
}
