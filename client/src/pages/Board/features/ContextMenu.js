import React, { Component, Fragment } from 'react'

export default class ContextMenu extends Component {
  render() {
    return (
      <Fragment>
        {this.props.render()}
      </Fragment>
    )
  }
}
