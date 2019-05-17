import "@babel/polyfill";
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from './store/configureStore';
import App from './components/App';

const store = configureStore();

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
    document.getElementById('procoder-app')
);
