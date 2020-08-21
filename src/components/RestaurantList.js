import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import Alert from '@material-ui/lab/Alert';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import {loadRestaurants} from '../store/restaurants/actions';

export function RestaurantList({
  loadRestaurants,
  restaurants,
  loading,
  loadError,
}) {
  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  return (
    <>
      {loading && <CircularProgress data-testid="loading-indicator" />}
      {loadError && <Alert severity="error">请求餐厅馆列表错误</Alert>}
      <List>
        {restaurants.map(restaurant => (
          <ListItem key={restaurant.id}>
            <ListItemText>{restaurant.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

function mapStateToProps(state) {
  return {
    restaurants: state.restaurants.records,
    loading: state.restaurants.loading,
    loadError: state.restaurants.loadError,
  };
}

const mapDispatchToProps = {loadRestaurants};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
