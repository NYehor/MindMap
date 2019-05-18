import React, { Component } from 'react';
import { Route,  Switch, Redirect} from 'react-router-dom';

import Sidebar from './features/Sidebar';
import Maps from './features/Maps';
import Sharable from './features/Sharable';
import Trash from './features/Trash';

export default class Board extends Component {
  
  render() {
    const { match, location, history } = this.props;
    const path = match.path;

    console.log('location ', location);
    console.log('match', match);
    console.log('history', history);
    console.log('-----------------------')
    return (
      <div className='board-wrapper'>

        <div className='sidebar'>
            <Sidebar path={match.url} />
        </div>

        <div className='content'>
          <Switch>
            <Redirect from={`${path}`} to={`${path}/my-maps`} component={Maps} exact />
            <Route path={`${path}/my-maps`} component={Maps} />
            <Route path={`${path}/sharable`} component={Sharable}  />
            <Route path={`${path}/trash`} component={Trash}  />
          </Switch>
        </div>

      </div>
    )
  }
}
