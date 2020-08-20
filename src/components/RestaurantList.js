import React, { useEffect } from 'react';

export function RestaurantList({ loadRestaurants }) {
  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  return <div>RestaurantList</div>;
}

export default RestaurantList;
