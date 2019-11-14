<template>
	<div id="app" class="m">
		<banner></banner>
		<search-filter></search-filter>
		<card :placeData="firstCountry"></card>
	</div>
</template>

<script>
import Card from './components/Card';
import Banner from './components/Banner';
import SearchFilter from './components/SearchFilter';
import { mapGetters } from 'vuex';
import { getCountriesAll } from '_store_/actions.js';
export default {
	name: 'app',
	components: {
		Banner,
		Card,
		'search-filter': SearchFilter
	},
	data() {
		return {
			count: 1
		}
	},
	mounted() {
		this.$store.dispatch('getCountriesAll');
	},
	computed: {
		...mapGetters(['countriesAll']),
		firstCountry() {
			return this.countriesAll && this.countriesAll[0] || {};
		}
	},
	methods: {
	}
};
</script>
<style lang='scss' type='text/css'>
@import '~_scss_/app';
#app {
	background-color: $LightModeBackground;
}
</style>
<style type='text/css'>
@import '~_icomoon_/style.css';
</style>
