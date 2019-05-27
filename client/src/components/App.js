import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Home from '../pages/Home';
import Board from '../pages/Board';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

import '../styles/style.scss';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header auth={this.props.auth} />
        <main>
          <Switch>
            {this.props.auth.logIn ? 
              <Route path="/board" component={Board} /> :
              <Route path="/" component={Home} exact />
            }
          </Switch>
        </main>
        <Footer />
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
	return { 
        auth: state.auth
    };
}

export default connect(mapStateToProps)(App);