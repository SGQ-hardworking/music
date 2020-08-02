import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        musicUrl:null,
        cookie: sessionStorage.getItem('cookie'),
        token: sessionStorage.getItem('token')
    },
    mutations: {
        
    },
    actions: {
    },
    modules: {
    }
  })
  