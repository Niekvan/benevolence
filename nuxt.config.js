const axios = require('axios');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'benevolence',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Exhibtion of Man and Leisure department Design Academy Eindhoven' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /* 
  ** CSS Import
  */
 css: [
   { src: '~/assets/scss/main.scss', lang: 'scss'},
  ],
  modules: [
    '@nuxtjs/moment',
    ['nuxt-sass-resources-loader', '@/assets/scss/variables.scss'],
    ['storyblok-nuxt', {
      accessToken: '48rZW3Lkw1m5tttJrhk9Pwtt',
      cacheProvider: 'memory'
    }],
  ],
  plugins: [
    '~/plugins/components.js',
    { src: '~/plugins/slick.js', ssr: false }
  ],
  router: {
    // scrollBehavior(to, from, savedPosition) {
    //   let position = false

    //   // savedPosition is only available for popstate navigations (back button)
    //   if (savedPosition) {
    //     position = savedPosition
    //   }

    //   // if no children detected
    //   if (to.matched.length < 2) {
    //     // scroll to the top of the page
    //     position = {
    //       x: 0,
    //       y: 0
    //     }
    //   } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    //     // if one of the children has scrollToTop option set to true
    //     position = {
    //       x: 0,
    //       y: 0
    //     }
    //   }

    //   return new Promise(resolve => {
    //     window.$nuxt.$once('triggerScroll', () => {
    //       if (to.hash && document.querySelector(to.hash)) {
    //         position = {
    //           selector: to.hash
    //         }
    //       }
    //       resolve(position)
    //     })
    //   })
    // }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
  },
  generate: {
    routes: function () {
      return axios.get(`https://api.storyblok.com/v1/cdn/stories?version=published&token=48rZW3Lkw1m5tttJrhk9Pwtt&starts_with=projects/&cv` + Math.floor(Date.now() / 1e3)
      ).then(res => {
        const routes = res.data.stories.map(route => route.full_slug)
        return [
          '/',
          ...routes
        ]
      })
    }
  }
}
