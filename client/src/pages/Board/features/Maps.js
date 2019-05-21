import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as treeActions from '../../../store/actions/tree';
import Placeholder from './Placeholder';
import MapsList from './MapsList';

class Maps extends Component {

  state = {
    maps: new Map()
  }

  static getDerivedStateFromProps({maps}) {
    return { maps }
  }

  render() {
    const { maps } = this.state;
    console.log(maps)

    return (
      <Fragment>
        {maps.size === 0 && <Placeholder title='There are no any maps yet!' />}
        {maps.size !== 0 && <MapsList maps={maps}/>}
      </Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(treeActions, dispatch);
}

function mapStateToProps(state) {
  const maps = new Map();

  state.treeList.filter(tree => tree.status === 'own')
  .map(tree => {
    if (!maps.has(tree.category)) {
      maps.set(tree.category, [tree]);
    }
    else {
      const prev = maps.get(tree.category);
      maps.set(tree.category, [...prev, tree]);
    }
  });
  
  console.log(state.treeList)
	return { 
    maps
  };
}

export default connect(mapStateToProps,	mapDispatchToProps)(Maps);