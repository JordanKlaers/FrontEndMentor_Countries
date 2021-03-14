<template>
	<div id="app">
		<banner></banner>
	</div>
</template>

<script>
import Card from './components/Card';
import Banner from './components/Banner';
import 'babel-polyfill';
export default {
	name: 'app',
	components: {
		Banner,
		Card
	},
	data() {
		return {
			regionsFilterList: [],
			searchValue: ''
		}
	},
	mounted() {
		// this.$store.dispatch('getCountriesAll');
		if (this.isInternetExplorer) {
			this.$refs['card-container'].classList.add('ie-fallback');
		}
	}
};
</script>
<style lang='scss' type='text/css'>
@import '~_scss_/app';
</style>
<style type='text/css'>
@import '~_icomoon_/style.css';
</style>
