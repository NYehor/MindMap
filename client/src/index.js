import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from './store/configureStore';
import App from './components/App';
import Home from './components/Home';


const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Home />
    </Provider>, 
    document.getElementById('procoder-app')
);
