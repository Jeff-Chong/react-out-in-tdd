import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { RestaurantList } from '../RestaurantList';

describe('<RestaurantList />', () => {
  afterEach(cleanup);

  it('渲染时调用 loadRestaurants 函数', () => {
    const loadRestaurants = jest.fn().mockName('loadRestaurants');
    const restaurants = [];

    render(
      <RestaurantList
        loadRestaurants={loadRestaurants}
        restaurants={restaurants}
      />,
    );

    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('显示餐馆列表', () => {
    const noop = () => { };
    const restaurants = [
      { id: 1, name: 'Sushi Place' },
      { id: 2, name: 'Pizza Place' },
    ];

    const { queryByText } = render(
      <RestaurantList loadRestaurants={noop} restaurants={restaurants} />,
    );

    // queryByText 为查询到值时返回 null
    expect(queryByText('Sushi Place')).not.toBeNull();
    expect(queryByText('Pizza Place')).not.toBeNull();
  });
});
