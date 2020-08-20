import React from 'react';
import { render } from '@testing-library/react';
import { RestaurantList } from '../RestaurantList';

describe('<RestaurantList />', () => {
  it('当第一次渲染时读取数据', () => {
    const loadRestaurants = jest.fn().mockName('loadRestaurants');
    render(<RestaurantList loadRestaurants={loadRestaurants} />);

    expect(loadRestaurants).toHaveBeenCalled();
  });
});
