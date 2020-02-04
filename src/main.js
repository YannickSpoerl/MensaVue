// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import RestService from '@/Services/RestService'
import { getCanteensMap } from './Services/FilterService'

Vue.config.productionTip = false

const globalData = new Vue({
  data: {
    canteens: new Map(),
    cities: []
  }
})

globalData.install = function () {
  Object.defineProperty(Vue.prototype, '$globalData', {
    get () {
      return globalData
    }
  })
}
Vue.use(globalData)

/* eslint-disable no-new */
new Vue({
  vuetify,
  el: '#app',
  beforeMount () {
    let self = this
    let restService = new RestService()
    restService.getAllCanteens()
      .then((result) => {
        self.$globalData.canteens = getCanteensMap(result)
        self.$globalData.cities = Array.from(self.$globalData.canteens.keys())
      })
  },
  components: { App },
  template: '<App/>'
})
