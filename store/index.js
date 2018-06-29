import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      projects: [],
      currentProject: null,
      settings: {}
    },
    mutations: {
      setStories(state, data) {
        state.projects = data
      },
      setSettings(state, story) {
        state.settings = story
      }
    },
    actions: {
      async nuxtServerInit({ commit }, { query, isDev }) {
        let version = query._storyblok || isDev ? 'draft' : 'published'
        return this.$storyapi.get(`cdn/stories/`, {
          version: version,
          starts_with: 'projects/'
        }).then(res => {
          commit('setStories', res.data.stories)
          return this.$storyapi.get(`cdn/stories/settings`, {
            version: version,
          }).then(res => {
            commit('setSettings', res.data.story)
          })
        })
      }
    }
  })
}

export default createStore