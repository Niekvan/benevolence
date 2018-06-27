import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      projects: [],
      currentProject: null
    },
    mutations: {
      setStories(state, data) {
        state.projects = data.stories
      }
    },
    actions: {
      nuxtServerInit({ commit }, { query, isDev }) {
        console.log('server init....')
        let version = query._storyblok || isDev ? 'draft' : 'published'
        this.$storyapi.get(`cdn/stories/`, {
          version: version,
          starts_with: 'projects/'
        }).then(res => {
          commit('setStories', res.data)
        })
      }
    }
  })
}

export default createStore