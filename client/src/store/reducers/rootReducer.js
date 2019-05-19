import { combineReducers } from "redux";
import tree from './treeReducer';
import treeList from './treeListReducer';

export default combineReducers({
    tree,
    treeList
});