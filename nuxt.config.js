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
    '~/plugins/components.js'
  ],
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
        // console.log(res)
        const routes = res.data.stories.map(route => route.full_slug)
        console.log(routes)
        return [
          '/',
          ...routes
        ]
      })
    }
  }
}
