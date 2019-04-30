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