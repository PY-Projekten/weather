

// Original Version: Ahidjo
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

  listEndpoint(path, action, params) {

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


  editLocation(endpoint, path, action, id, locationData) {
    return this.getData(this.client.patch(`/${endpoint}/${path}/${action}/${id}/`, locationData));
  }

  async deleteLocation(endpoint, path, id) {
    try {
      const response = await this.client.delete(`/${endpoint}/${path}/edit/${id}/`);
      // Since a 204 response does not include a body, we return an object with the status code
      return { status: response.status };
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error in deleteLocation:', error);
      throw error;
    }
  }


}

export default $axios => resource => new Endpoint($axios, resource)






