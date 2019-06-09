import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';

const PrivateRoute = ({ component: Component, isLogin, ...rest }) => {

console.log('isLogin', isLogin);
return <Route {...rest} render={(props) => (
      isLogin === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} 
          component={Home} />
    )} />} 
    
;

export default PrivateRoute;
