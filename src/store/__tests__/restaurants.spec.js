import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import restaurantsReducer from '../restaurants/reducers';
import {loadRestaurants} from '../restaurants/actions';

describe('restaurants actions', () => {
  describe('初始化', () => {
    let store;
    beforeEach(() => {
      const inititalState = {};
      store = createStore(
        restaurantsReducer,
        inititalState,
        applyMiddleware(thunk),
      );
    });
    it('没有设置 loading 标志', () => {
      expect(store.getState().loading).toEqual(false);
    });
    it('没有必要设置 error 标签', () => {
      expect(store.getState().loadError).toEqual(false);
    });
  });

  describe('当加载成功时', () => {
    const records = [
      {id: 1, name: 'Sushi Place'},
      {id: 2, name: 'Pizza Place'},
    ];

    let store;

    beforeEach(() => {
      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };
      const initialState = {
        records: [],
      };

      store = createStore(
        restaurantsReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );
      return store.dispatch(loadRestaurants());
    });

    it('存储restaurants', () => {
      expect(store.getState().records).toEqual(records);
    });

    it('清除 loading 标志', () => {
      expect(store.getState().loading).toEqual(false);
    });
  });

  describe('加载时', () => {
    let store;
    beforeEach(() => {
      const api = {
        loadRestaurants: () => new Promise(() => {}),
      };
      const initialState = {
        loadError: true,
      };

      store = createStore(
        restaurantsReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );
      store.dispatch(loadRestaurants());
    });
    it('清除 error 标记', () => {
      expect(store.getState().loadError).toEqual(false);
    });
    it('设置 loading 标志', () => {
      expect(store.getState().loading).toEqual(true);
    });
  });

  describe('加载失败时', () => {
    let store;
    beforeEach(() => {
      const api = {
        loadRestaurants: () => Promise.reject(),
      };
      const initialState = {};

      store = createStore(
        restaurantsReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );

      return store.dispatch(loadRestaurants());
    });

    it('设置 error 标签', () => {
      expect(store.getState().loadError).toEqual(true);
    });
    it('清理 loading 标记', () => {
      expect(store.getState().loading).toEqual(false);
    });
  });
});
