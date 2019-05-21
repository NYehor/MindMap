import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as treeActions from '../store/actions/tree';
import Tree from './Tree';

class TreeContainer extends Component {

    componentDidMount() {
        const { mapId } = this.props.match.params;
        this.props.setSelectedTree(mapId);
    }

    componentWillUnmount() {
        this.props.resetSelectedtree();
    }

	render() {
        console.log(this.props)
        console.log('%c TREECONTAINER: render ', 'color: green; background-color: LightGreen; font-weight: bold')
        return this.props.tree.id !== '' ?
                <Tree 
                    treeName={this.props.tree.name}
                    nodes={this.props.tree.nodes}
                    addNode={this.props.addNode}
                    removeNode={this.props.removeNode}
                    updateNode={this.props.updateNode}
                /> : null;
	}
}


function mapDispatchToProps(dispatch) {
	return bindActionCreators(treeActions, dispatch);
}

function mapStateToProps(state) {
	return { 
        tree: state.tree
    };
}

export default connect(
    mapStateToProps,	
    mapDispatchToProps)(TreeContainer);
