// import Vuex from 'vuex'

// const createStore = () => {
//   return new Vuex.Store({
//     state: {
//       designers: null
//     },
//     mutations: {
//       updateDesigners(state, data) {
//         console.log(data.stories)
//         state.designers = data.stories
//       }
//     },
//     actions: {
//       nuxtServerInit({ commit }, { query, isDev }) {
//         let version = query._storyblok || isDev ? 'draft' : 'published'
//         this.$storyapi.get(`cdn/stories/`, {
//           version: 'draft',
//           starts_with: 'projects/'
//         }).then(res => {
//           commit('updateDesigners', res.data)
//         })
//       }
//     }
//   })
// }

// export default createStore