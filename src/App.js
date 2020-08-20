import React from 'react';
import store from './store';
import {Provider} from 'react-redux';
import RestaurantScreen from './components/RestaurantScreen';

import {Server} from 'miragejs';

if (!window.Cypress) {
  new Server({
    environment: 'test',

    routes() {
      this.namespace = '/fakeApi';
      this.get('/restaurants', [
        {id: 1, name: 'xx Place'},
        {id: 2, name: 'yy Place'},
      ]);
    },
  });
}

export default function App() {
  return (
    <Provider store={store}>
      <RestaurantScreen />
    </Provider>
  );
}
