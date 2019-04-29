import initialState from '../initialState/tree';
import * as types from '../actionTypes';

export default function treeReducer(state = initialState, action) {
    switch (action.type) {
        case types.ADD_NODE:
            return {
                ...state,
                nodes: [...state.nodes, action.payload]
            }
    
        default:
            return state;
    }
}