import initialState from '../initialState/';
import * as types from '../actionTypes';

export default function treeListReducer(state = initialState.treeList, action) {
    switch (action.type) {

        case types.ADD_TREE:
            return [
                ...state,
                action.payload
            ];
            
        case types.UPDATE_TREE:
            return state.map(tree => {
                if (tree.id !== action.payload.id) {
                    return tree;
                }
                else {
                    return action.payload
                }
            });  

        case types.REMOVE_TREE:
            return state.filter(tree => tree.id !== action.payload.id);

        // case types.FIND_TREE:
        //     return state.find(tree => tree.id === action.payload.id);

        default:
            return state;
    }
}