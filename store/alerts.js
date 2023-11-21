// export const state = () => ({
//   toast: {
//     content: '',
//     color: '',
//   },
//
//   timeout: undefined
// })
//
// export const mutations = {
//   SET_TIMEOUT(state, time){
//     state.timeout = time
//   },
//   SHOW_TOAST(state, payload) {
//     state.toast.content = payload.content
//     state.toast.color = payload.color
//   },
// }
//
//
// export const getters = {
//   timeout: (state) => {
//     return state.timeout
//   },
// }


export const state = () => ({
  toast: {
    content: '',
    color: '',
    visible: false, // Added visibility control
  },
  timeout: undefined
})

export const mutations = {
  SET_TIMEOUT(state, time) {
    state.timeout = time
  },
  SHOW_TOAST(state, payload) {
    state.toast.content = payload.content
    state.toast.color = payload.color
    state.toast.visible = true; // Set visible to true when showing toast
  },
  CLEAR_TOAST(state) {
    state.toast.content = '';
    state.toast.color = '';
    state.toast.visible = false; // Set visible to false when clearing toast
  },
}

export const actions = {
  showToast({ commit }, payload) {
    commit('SHOW_TOAST', payload);
    // Optionally, set a timeout to automatically clear the toast
  },
  clearToast({ commit }) {
    commit('CLEAR_TOAST');
  },
}

export const getters = {
  toast: (state) => state.toast,
  timeout: (state) => state.timeout,
}

