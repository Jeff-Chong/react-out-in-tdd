import axios from 'axios';
const client = axios.create({
  baseURL: 'fakeApi',
});
const api = {
  loadRestaurants() {
    return client.get('/restaurants').then(response => response.data);
  },
};

export default api;
