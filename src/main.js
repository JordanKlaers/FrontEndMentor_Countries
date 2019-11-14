'use strict';
import Vue from 'vue';
import App from './App';
import store from '_store_/store';

new Vue({
	el: '#crazyapp',
	components: { App },
	store,
	render: function(createElement) {
		return createElement(App);
	}
});

export default store;