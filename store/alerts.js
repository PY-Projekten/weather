export const state = () => ({
  toast: {
    content: '',
    color: '',
  },

  timeout: undefined
})

export const mutations = {
  SET_TIMEOUT(state, time){
    state.timeout = time
  },
  SHOW_TOAST(state, payload) {
    state.toast.content = payload.content
    state.toast.color = payload.color
  },
}


export const getters = {
  timeout: (state) => {
    return state.timeout
  },
}
