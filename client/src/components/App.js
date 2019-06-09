import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home';
import Board from '../pages/Board';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

import '../styles/style.scss';

class App extends Component {

  componentDidMount() {
    this.props.logIn && this.props.history.push('/board');


  }

  // state = {
  //   logIn: false
  // }

  // static getDerivedStateFromProps(props, state) {    
  //   console.log('getDerivedStateFromProps')
  //   return {
  //     logIn: props.logIn
  //   }
  // }

  componentDidUpdate(prevProps) {
    console.log('1',prevProps);
    console.log('2',this.props);
  } 

  render() {
    const { logIn } = this.props;

    return (
      <Fragment>
        <Header logIn={logIn} />
        <main>
          {/* <Switch>
            <PrivateRoute isLogin={logIn} path="/board" component={Board} exact />
            <Route path="/" component={Home} exact />
          </Switch>  */}

            {logIn ? 
              <Route path="/board" component={Board} /> :
              <Route path="/" component={Home} exact />
            }
        </main>
        <Footer />
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  console.log('mapStateToProps')
	return { 
        logIn: state.auth.logIn
    };
}

export default withRouter(connect(mapStateToProps)(App));