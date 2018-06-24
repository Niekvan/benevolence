import Vue from 'vue'

import projectDetail from '~/components/projectDetail.vue'
import projectList from '~/components/projectList.vue'
import infoList from '~/components/infoList.vue'
import imageResize from '~/components/imageResize.vue'

Vue.component('project-detail', projectDetail)
Vue.component('project-list', projectList)
Vue.component('info-list', infoList)
Vue.component('img-resize', imageResize)