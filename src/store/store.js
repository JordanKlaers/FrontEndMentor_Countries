import * as actions from './actions';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		countriesAll: null
	},
	mutations: {
		UPDATE_COUNTRIES_ALL(state, payload) {
			state.countriesAll = payload;
		}
	},
	getters: {
		countriesAll: state => state.countriesAll
	},
	actions,
	modules: {}
});

export default store;