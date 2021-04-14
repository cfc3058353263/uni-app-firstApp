import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		grpList:[]
	},
    mutations: {
		addgrpList(state,list){
			state.grpList = list
		}
	},
    actions: {}
})
export default store