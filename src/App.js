import React from 'react';
import store from './store';
import {Provider} from 'react-redux';
import {createMuiTheme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import {ThemeProvider} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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

const theme = createMuiTheme({
  palette: {
    primary: purple,
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">OutsideIn Tdd</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <RestaurantScreen />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}
