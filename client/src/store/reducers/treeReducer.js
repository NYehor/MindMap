import initialState from '../initialState/';
import nodesReducer from './nodesReducer';
import * as types from '../actionTypes';

export default function treeReducer(state = initialState.tree, action) {

    console.log(state);

    switch (action.type) {

        case types.SET_SELECTED_TREE:
            return action.payload;

        case types.RESET_SELECTED_TREE:
            return {
                id: '',
                name: '',
                category: '',
                status: 'own',
                nodes: []            
            };

        default:
            return {
                ...state,
                nodes: nodesReducer(state.nodes, action)
            }
    }
}