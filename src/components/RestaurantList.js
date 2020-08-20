import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadRestaurants} from '../store/restaurants/actions';

export function RestaurantList({loadRestaurants, restaurants}) {
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

function mapStateToProps(state) {
  return {
    restaurants: state.restaurants.records,
  };
}

const mapDispatchToProps = {loadRestaurants};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
