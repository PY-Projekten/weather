// export const state = () => ({
//
//   page: 'one'
// })
//
// export const mutations = {
//   SET_PAGE(state, val){
//     state.page = val
//   },
// }

export const state = () => ({
  page: 'one',
  // Add more global states here as needed
})

export const mutations = {
  SET_PAGE(state, val) {
    state.page = val
  },
  // Add more mutations as needed
}

export const actions = {
  setPage({ commit }, page) {
    commit('SET_PAGE', page);
  },
  // Add more actions as needed
}

export const getters = {
  currentPage: (state) => state.page,
  // Add more getters as needed
}

