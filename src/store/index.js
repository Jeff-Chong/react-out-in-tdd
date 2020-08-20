import api from '../api';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {devToolsEnhancer} from 'redux-devtools-extension';
import {compose, createStore, applyMiddleware} from 'redux';

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk.withExtraArgument(api)), devToolsEnhancer()),
);

export default store;
