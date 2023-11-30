export default function ({app, store, $axios, redirect}) {

    $axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1"
    $axios.defaults.headers = {
      "Content-Type": "application/json",
    }



    $axios.onRequest(config => {
      console.log(config.url)
      /*if (store.state.authToken != null && store.state.authToken != "") {
        config.headers.Authorization = 'Token ' + store.state.authToken
      }
  */
    })
  }

