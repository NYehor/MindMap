import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import Home from '../pages/Home';
import Board from '../pages/Board';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

import '../styles/style.scss';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/board" component={Board} />
          </Switch>
        </main>
        <Footer />
      </Fragment>
    )
  }
}
