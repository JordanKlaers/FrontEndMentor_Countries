<template>
	<div id="app">
		<banner></banner>
		<search-filter :searchValue.sync="searchValue"></search-filter>
		<region-filter :regions="regions" @updateRegionFilter="updateSelectedRegionFilters"></region-filter>
		<card
			:placeData="country"
			v-for="(country, index) in filteredCountries"
			:key="index">
		</card>
	</div>
</template>

<script>
import Card from './components/Card';
import Banner from './components/Banner';
import SearchFilter from './components/SearchFilter';
import RegionFilter from './components/RegionFilter';
import { mapGetters } from 'vuex';
import { getCountriesAll } from '_store_/actions.js';
import MainFilter from '_mixins_/MainFilter';
import 'babel-polyfill';
export default {
	name: 'app',
	components: {
		Banner,
		Card,
		'search-filter': SearchFilter,
		'region-filter': RegionFilter
	},
	data() {
		return {
			regionsFilterList: [],
			searchValue: ''
		}
	},
	mounted() {
		this.$store.dispatch('getCountriesAll');
	},
	mixins: [MainFilter]
};
</script>
<style lang='scss' type='text/css'>
@import '~_scss_/app';
</style>
<style type='text/css'>
@import '~_icomoon_/style.css';
</style>
