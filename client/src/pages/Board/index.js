import React, { Component } from 'react';
import { Route,  Switch, Redirect} from 'react-router-dom';

import Sidebar from './features/Sidebar';
import Maps from './features/Maps';
// import Map from './features/Map';
import TreeContainer from '../../components/TreeContainer';
import Sharable from './features/Sharable';
import Trash from './features/Trash';

export default class Board extends Component {
  
  showSidebar(path) {
    return ['/my-maps', 
            '/sharable', 
            '/trash']
          .some(tail => path.endsWith(tail));
  }

  render() {

    const { match, location, history } = this.props;
    const path = match.path;
    console.log(path);
    console.log(location)


    return (
      <div className='board-wrapper'>

        {this.showSidebar(location.pathname) && 
          <div className='sidebar'>
              <Sidebar path={match.url} />
          </div>
        }

        <div className='content'>
          <Switch>
            <Redirect from={`${path}`} to={`${path}/my-maps`} component={Maps} exact />
            <Route path={`${path}/my-maps`} component={Maps} exact />
            <Route path={`${path}/my-maps/:mapId`} component={TreeContainer} />
            <Route path={`${path}/sharable`} component={Sharable} />
            <Route path={`${path}/trash`} component={Trash}  />
          </Switch>
        </div>

      </div>
    )
  }
}
