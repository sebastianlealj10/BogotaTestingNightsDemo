import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Character } from './components/Character';
import { Location } from './components/Location';
import { Episode } from './components/Episode';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/character' component={Character} />
            <Route path='/location' component={Location} />
            <Route path='/episode' component={Episode} />
      </Layout>
    );
  }
}
