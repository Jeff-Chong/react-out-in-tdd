import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import restaurantsReducer from '../restaurants/reducers';
import {loadRestaurants, createRestaurant} from '../restaurants/actions';

describe('loadRestaurants actions', () => {
  describe('初始化', () => {
    let store;
    beforeEach(() => {
      const initialState = {};
      store = createStore(
        restaurantsReducer,
        initialState,
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

describe('createRestaurant action', () => {
  const newRestaurantName = 'Sushi Place';
  const existingRestaurant = {id: 1, name: 'Pizza Place'};
  const responseRestaurant = {id: 2, name: newRestaurantName};

  let api;
  let store;
  let promise;
  beforeEach(() => {
    api = {
      createRestaurant: jest.fn().mockName('createRestaurant'),
    };
    const initialState = {
      records: [existingRestaurant],
    };
    store = createStore(
      restaurantsReducer,
      initialState,
      applyMiddleware(thunk.withExtraArgument(api)),
    );
  });

  it('向服务器发送请求保存餐馆名', () => {
    api.createRestaurant.mockResolvedValue(responseRestaurant);
    store.dispatch(createRestaurant(newRestaurantName));
    expect(api.createRestaurant).toHaveBeenCalledWith(newRestaurantName);
  });

  describe('当请求成功时', () => {
    beforeEach(() => {
      api.createRestaurant.mockResolvedValue(responseRestaurant);
      promise = store.dispatch(createRestaurant(newRestaurantName));
    });

    it('保存成功的请求数据', () => {
      expect(store.getState().records).toEqual([
        existingRestaurant,
        responseRestaurant,
      ]);
    });

    it('resolves', () => {
      return expect(promise).resolves.toBeUndefined();
    });
  });

  describe('当请求失败时', () => {
    it('rejects', () => {
      api.createRestaurant.mockRejectedValue();
      promise = store.dispatch(createRestaurant(newRestaurantName));
      return expect(promise).rejects.toBeUndefined();
    });
  });
});
