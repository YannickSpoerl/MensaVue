// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import RestService from '@/services/RestService'
import { getCanteensMap, computeFilters } from './services/FilterService'
import Vuex from 'vuex'
import {version} from '../package.json';

Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    selectedCity: undefined,
    selectedCanteens: [],
    availableFilters: [],
    selectedFilters: [],
    appVersion: undefined  },
  mutations: {
    setAppVersion (state, v) {
      state.appVersion = v
    },
    selectCity (state, city) {
      state.selectedCity = city
    },
    selectCanteen (state, canteens) {
      state.selectedCanteens = canteens
    },
    unselectCanteen (state, index) {
      state.selectedCanteens.splice(index, 1)
    },
    selectMeals (state, meals) {
      state.availableFilters = computeFilters(meals)
      state.availableFilters.sort()
    },
    changeFilters (state, filters) {
      state.selectedFilters = filters
    }
  },
  getters: {
    selectedCanteens (state) {
      return state.selectedCanteens
    },
    availableFilters (state) {
      return state.availableFilters
    },
    selectedFilters (state) {
      return state.selectedFilters
    }
  }
})

const globalData = new Vue({
  data: {
    canteens: new Map(),
    cities: [],
    restService: undefined,
    meals: new Map()
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
  store,
  beforeMount () {
    store.commit('setAppVersion', version)
    let self = this
    let restService = new RestService()
    self.$globalData.restService = restService
    restService.getAllCanteens()
      .then((result) => {
        self.$globalData.canteens = getCanteensMap(result)
        let citiesArray = Array.from(self.$globalData.canteens.keys())
        self.$globalData.cities = citiesArray.sort()
      })
  },
  components: { App },
  template: '<App/>'
})
