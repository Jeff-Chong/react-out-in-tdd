import React from 'react';
import {render, cleanup} from '@testing-library/react';
import {RestaurantList} from '../RestaurantList';

describe('<RestaurantList />', () => {
  const restaurants = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];
  let context;
  let loadRestaurants;

  function renderWithProps(propOverrides = {}) {
    const props = {
      loadRestaurants: jest.fn().mockName('loadRestaurants'),
      restaurants,
      loading: false,
      ...propOverrides,
    };
    loadRestaurants = props.loadRestaurants;
    context = render(<RestaurantList {...props} />);
  }

  afterEach(cleanup);

  it('渲染时调用 loadRestaurants 函数', () => {
    renderWithProps();
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('显示加载器当它读取数据时', () => {
    renderWithProps({loading: true});
    const {queryByTestId} = context;
    expect(queryByTestId('loading-indicator')).not.toBeNull();
  });

  describe('当加载成功时', () => {
    beforeEach(() => {
      renderWithProps();
    });

    it('不显示加载器当他设置 loading: false 时', () => {
      const {queryByTestId} = context;
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    it('不显示错误信息', () => {
      const {queryByText} = context;
      expect(queryByText('请求餐厅馆列表错误')).toBeNull();
    });

    it('显示餐馆列表', () => {
      const {queryByText} = context;

      // queryByText 为查询到值时返回 null
      expect(queryByText('Sushi Place')).not.toBeNull();
      expect(queryByText('Pizza Place')).not.toBeNull();
    });
  });

  describe('当加载失败时', () => {
    beforeEach(() => {
      renderWithProps({loadError: true});
    });

    it('显示错误信息', () => {
      const {queryByText} = context;
      expect(queryByText('请求餐厅馆列表错误')).not.toBeNull();
    });
  });
});
