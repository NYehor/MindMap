import * as types from '../actionTypes';


export function addNode(parent, node) {

    let newNode = (node === undefined) ?
                    {
                        node: {
                            name: parent
                        },
                        parent: {}    
                    } :
                    {
                        node,
                        parent: {
                            name: parent
                        }
                    };

    return {
        type: types.ADD_NODE,
        payload: newNode
    }
};

// make recursive when delete intermediate node
export function removeNode(parent, node) {


    return {
        type: types.REMOVE_NODE,
        payload: node
    }
}