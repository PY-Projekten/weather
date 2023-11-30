/*
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
*/


// New Version: with extended Class

export class Endpoint {
  constructor(axios, resource) {
    this.client = axios
    this.single_resource = resource.split('/')[0]
    this.list_resource = resource.replace('/', '')
  }

  async getData(result) {
    try {
      let {data} = await result
      // console.log(data)
      if (data.data == null && data.status === 'success') {
        // if the API returns nothing - because an item was deleted
        // but the operation completed successfully, return an empty object instead of null
        data.success = true
        return data
      }

      // if no errors occurred, indicate the operation was successful and return the response data content
      let ret = data
      //console.log("RET", ret)
      ret.success = true
      return ret

    } catch (error) {
      // return the whole response in order for error handling to work
      console.log(error)
      let data = error.response.data || {}
      data.success = false
      return data
    }
  }

  index() {
    return this.get()
  }

  get(payload = null) {
    return this.getData(this.client.get(`${this.list_resource}`, {params: payload}))
  }

  update(payload = null) {
    return this.getData(this.client.patch(`${this.list_resource}`, payload))
  }
  create(payload = null) {
    return this.getData(this.client.post(`${this.list_resource}`, payload))
  }
  createObject(path, action, payload) {
    return this.getData(this.client.post(`/${this.list_resource}/${path}/${action}/`, payload))
  }
  fetchEndpoint(path, action, params, config) {

    let slugs = []
    let local = ''
    if (params){
      let keys = Object.keys(params)
      for (let i in keys){
        slugs.push(params[keys[i]])
      }
      local = slugs.join('/')
      if (slugs.length){
        local += '/'
      }
    }

    return this.getData(this.client.get(`/${this.list_resource}/${path}/${action}/${local}`, config))
  }

  listLocationById(path, action, params, config) {
    const id = params.id
    return this.getData(this.client.get(`/${this.list_resource}/${path}/${id}/${action}`), config)
  }

  listLocations(path, action, params) {

    return this.getData(this.client.get(`/${this.list_resource}/${path}/${action}/`));
  }
  getLocation($axios, id) {
    return $axios.get(`/locations/${id}/`);
  }
  createLocation($axios, locationData) {
    return $axios.post('/locations/', locationData);
  }
  updateLocation($axios, id, locationData) {
    return $axios.put(`/locations/${id}/`, locationData);
  }
}


// New
export class ExtendedEndpoint extends Endpoint {
  // Specific methods for location_detail operations
  editLocationDetail(id, locationData) {
    return this.getData(this.client.patch(`/weather/location/edit/${id}/`, locationData));
  }

  deleteLocationDetail(id) {
    return this.getData(this.client.delete(`/weather/location/edit/${id}/`));
  }
}

// Default export function
export default $axios => {
  return {
    endpoint: new Endpoint($axios, 'your_resource_here'),
    extendedEndpoint: new ExtendedEndpoint($axios, 'your_resource_here')
  };
};
















// Original Version: Ahidjo
// export class Endpoint {
//   constructor(axios, resource) {
//     this.client = axios
//     this.single_resource = resource.split('/')[0]
//     this.list_resource = resource.replace('/', '')
//   }
//
//   async getData(result) {
//     try {
//       let {data} = await result
//       // console.log(data)
//       if (data.data == null && data.status === 'success') {
//         // if the API returns nothing - because an item was deleted
//         // but the operation completed successfully, return an empty object instead of null
//         data.success = true
//         return data
//       }
//
//       // if no errors occurred, indicate the operation was successful and return the response data content
//       let ret = data
//       //console.log("RET", ret)
//       ret.success = true
//       return ret
//
//     } catch (error) {
//       // return the whole response in order for error handling to work
//       console.log(error)
//       let data = error.response.data || {}
//       data.success = false
//       return data
//     }
//   }
//
//   index() {
//     return this.get()
//   }
//
//   get(payload = null) {
//     return this.getData(this.client.get(`${this.list_resource}`, {params: payload}))
//   }
//
//   update(payload = null) {
//     return this.getData(this.client.patch(`${this.list_resource}`, payload))
//   }
//   create(payload = null) {
//     return this.getData(this.client.post(`${this.list_resource}`, payload))
//   }
//   createObject(path, action, payload) {
//     return this.getData(this.client.post(`/${this.list_resource}/${path}/${action}/`, payload))
//   }
//   fetchEndpoint(path, action, params, config) {
//
//     let slugs = []
//     let local = ''
//     if (params){
//       let keys = Object.keys(params)
//       for (let i in keys){
//         slugs.push(params[keys[i]])
//       }
//       local = slugs.join('/')
//       if (slugs.length){
//         local += '/'
//       }
//     }
//
//     return this.getData(this.client.get(`/${this.list_resource}/${path}/${action}/${local}`, config))
//   }
//
//   listLocationById(path, action, params, config) {
//     const id = params.id
//     return this.getData(this.client.get(`/${this.list_resource}/${path}/${id}/${action}`), config)
//   }
//
//   listLocations(path, action, params) {
//
//     return this.getData(this.client.get(`/${this.list_resource}/${path}/${action}/`));
//   }
//   getLocation($axios, id) {
//     return $axios.get(`/locations/${id}/`);
//   }
//   createLocation($axios, locationData) {
//     return $axios.post('/locations/', locationData);
//   }
//   updateLocation($axios, id, locationData) {
//     return $axios.put(`/locations/${id}/`, locationData);
//   }
//
//
//   editLocation(endpoint, path, action, id, locationData) {
//     return this.getData(this.client.patch(`/${endpoint}/${path}/${action}/${id}/`, locationData));
//   }
//
//   deleteLocation($axios, id) {
//     return $axios.delete(`/locations/${id}/`);
//   }
// }
//
// export default $axios => resource => new Endpoint($axios, resource)
