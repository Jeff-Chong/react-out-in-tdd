import React, { useEffect } from 'react';

export function RestaurantList({ loadRestaurants, restaurants }) {
  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  return (
    <ul>
      {restaurants.map(restaurant => (
        <li key={restaurant.name}>{restaurant.name}</li>
      ))}
    </ul>
  );
}

export default RestaurantList;
