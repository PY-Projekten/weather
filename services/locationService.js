export const locationService= {
  listLocations($axios) {
    return $axios.get('/locations/');
  },
  getLocation($axios, id) {
    return $axios.get(`/locations/${id}/`);
  },
  createLocation($axios, locationData) {
    return $axios.post('/locations/', locationData);
  },
  updateLocation($axios, id, locationData) {
    return $axios.put(`/locations/${id}/`, locationData);
  },
  editLocation($axios, id, locationData) {
    return $axios.put('/locations/', locationData);
  },
  deleteLocation($axios, id) {
    return $axios.delete(`/locations/${id}/`);
  }
};
