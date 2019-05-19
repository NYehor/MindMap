import initialState from '../initialState/';
import nodesReducer from './nodesReducer';
import * as types from '../actionTypes';

export default function treeReducer(state = initialState.tree, action) {

    console.log(state);

    switch (action.type) {

        case types.RESET_TREE:
            return state;

        default:
            return {
                ...state,
                nodes: nodesReducer(state.nodes, action)
            }
    }
}