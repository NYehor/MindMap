import uniqid from 'uniqid';
import * as types from '../actionTypes';
import { getNodeDescendants } from '../../services/treeTraverse';


/**
 * 
 * node
 * - id
 * - name
 * - parentID
 * - content
 * - largeSnippets 
 * 
 */

export function addNode(parent, node) {

    const root = {
        id: uniqid(),
        parentID: null,
        content: `### ${parent}`
    };

    const common = {
        id: uniqid(),
        parentID: parent,
        // ...node
        // name: node.name,
        content: node,
        largeSnippets: []
    };

    const newNode = node ? common : root;

    return {
        type: types.ADD_NODE,
        payload: newNode
    };      

};


export function removeNode(node) {
    return function(dispatch, getState) {
        
        const data = getState().tree.nodes;
        const nodesToRemove = getNodeDescendants(node, data);

        console.log(nodesToRemove);

        nodesToRemove.reverse().forEach(node => {
            dispatch({
                type: types.REMOVE_NODE,
                payload: node
            });     
        });
    
    }
}


export function updateNode(node, content) {
    return function(dispatch, getState) {

        const updatedNode = {
            ...node,
            content
        };

        dispatch({
            type: types.UPDATE_NODE,
            payload: updatedNode
        });
    }
}
