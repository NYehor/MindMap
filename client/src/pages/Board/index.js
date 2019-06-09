import React, { Component } from 'react';
import { Route,  Switch, Redirect} from 'react-router-dom';

import Sidebar from './features/Sidebar';
import Maps from './features/Maps';
// import Map from './features/Map';
import TreeContainer from '../../components/TreeContainer';
import Sharable from './features/Sharable';
import Trash from './features/Trash';

export default class Board extends Component {
  
  showSidebarForPages(path) {
    return ['/my-maps', 
            '/sharable', 
            '/trash']
          .some(tail => path.endsWith(tail));
  }

  render() {

    const { match, location } = this.props;
    const path = match.path;
    console.log(path);
    console.log(location)


    return (
      <div className='board-wrapper'>

        {this.showSidebarForPages(location.pathname) && 
          <Sidebar path={match.url} />
        }
        <Switch>
          <Redirect from={`${path}`} to={`${path}/my-maps`} component={Maps} exact />
          <Route path={`${path}/my-maps`} component={Maps} exact />
          <Route path={`${path}/my-maps/:mapId`} component={TreeContainer} />
          <Route path={`${path}/sharable`} component={Sharable} />
          <Route path={`${path}/trash`} component={Trash}  />
        </Switch>

      </div>
    )
  }
}
