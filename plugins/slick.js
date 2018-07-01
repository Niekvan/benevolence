import Vue from 'vue'
import Slick from 'vue-slick';
import VueParallaxJs from 'vue-parallax-js'

Vue.component('Slick', Slick)
Vue.use(VueParallaxJs, { minWidth: 768 })