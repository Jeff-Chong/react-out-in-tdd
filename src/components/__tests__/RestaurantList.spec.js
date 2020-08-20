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

  beforeEach(() => {
    loadRestaurants = jest.fn().mockName('loadRestaurants');
    context = render(
      <RestaurantList
        loadRestaurants={loadRestaurants}
        restaurants={restaurants}
      />,
    );
  });

  afterEach(cleanup);

  it('渲染时调用 loadRestaurants 函数', () => {
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('显示餐馆列表', () => {
    const {queryByText} = context;

    // queryByText 为查询到值时返回 null
    expect(queryByText('Sushi Place')).not.toBeNull();
    expect(queryByText('Pizza Place')).not.toBeNull();
  });
});
