import { combineReducers } from "redux";
import tree from './treeReducer';
import treeList from './treeListReducer';
import alert from './alertReducer';
import auth from './authReducer';


export default combineReducers({
    alert,
    auth,
    tree,
    treeList
});