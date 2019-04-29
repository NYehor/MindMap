import * as types from '../actionTypes';


export function addNode(parent, node = null) {

    let newNode = typeof parent === 'string' ?
                    {
                        node: {
                            name: parent
                        },
                        parent: {}    
                    } :
                    {
                        node,
                        parent: {
                            name: parent.name
                        }
                    };

    return {
        type: types.ADD_NODE,
        payload: newNode
    }
};