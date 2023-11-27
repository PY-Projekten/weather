import createRepository from '../services/locationService'

export default (ctx, inject) => {
  const axios = ctx.$axios
  const repositoryWithAxios = createRepository(axios)

  const repositories = {

    weather: repositoryWithAxios('weather'),
  }
  inject('repository', repositories)
}
