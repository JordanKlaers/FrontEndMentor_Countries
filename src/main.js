'use strict';
import Vue from 'vue';
import App from './App';
import store from '_store_/store';

import BrowserCheck from '_mixins_/BrowserCheck';

Vue.mixin(BrowserCheck);

new Vue({
	el: '#crazyapp',
	components: { App },
	store,
	render: function(createElement) {
		return createElement(App);
	}
});

export default store;