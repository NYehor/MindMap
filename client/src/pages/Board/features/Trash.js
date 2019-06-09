import React, { Component, Fragment } from 'react'
import Placeholder from './Placeholder';

export default class Trash extends Component {
  render() {
    return (
      <div className='board__content'>
        <Placeholder title='Trash is empty' />
      </div>
    )
  }
}
