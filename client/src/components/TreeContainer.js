import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as treeActions from '../store/actions/tree';
import Tree from './Tree';

class TreeContainer extends Component {

    constructor() {
        super();
    }

	render() {
        console.log('%c TREECONTAINER: render ', 'color: green; background-color: LightGreen; font-weight: bold')

        return <Tree 
                    treeName={this.props.treeName}
                    data={this.props.nodes}
                    addNode={this.props.addNode} />;
	}
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators(treeActions, dispatch);
}

function mapStateToProps(state) {
	return { 
        nodes: state.tree.nodes,
        treeName: state.tree.name
    };
}

export default connect(
    mapStateToProps,	
    mapDispatchToProps)(TreeContainer);
