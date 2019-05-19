import initialState from '../initialState/tree';
import * as types from '../actionTypes';

export default function treeReducer(state = initialState.nodes, action) {
    switch (action.type) {
        case types.ADD_NODE:
            return [
                ...state,
                action.payload
            ];
    
        case types.REMOVE_NODE:
            return state.filter(node => node.id !== action.payload.id);
            

        case types.UPDATE_NODE:
            return  state.map(node => {
                            if (node.id !== action.payload.id) {
                                return node;
                            }
                            else {
                                return action.payload
                            }
                    });
        

        default:
            return state;
    }
}