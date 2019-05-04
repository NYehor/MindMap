import initialState from '../initialState/tree';
import * as types from '../actionTypes';

export default function treeReducer(state = initialState, action) {
    switch (action.type) {
        case types.ADD_NODE:
            return {
                ...state,
                nodes: [...state.nodes, action.payload]
            }
    
        case types.REMOVE_NODE:
            return {
                ...state,
                nodes: state.nodes.filter(node => node.id !== action.payload.id)
            }
        case types.UPDATE_NODE:
            return {
                ...state,
                nodes: [
                    state.nodes.filter(n => node.id !== action.payload.id), 
                    action.payload
                ]
            }
        default:
            return state;
    }
}