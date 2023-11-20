export const state = () => ({

  page: 'one'
})

export const mutations = {
  SET_PAGE(state, val){
    state.page = val
  },
}
