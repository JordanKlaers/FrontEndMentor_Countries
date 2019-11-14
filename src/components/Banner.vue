<template>
	<div id="banner" class="p-30">
		<span class="ft-xtr-bold ft-sz-20">Where in the world?</span>
		<span class="ft-normal m-lft-auto ft-sz-18"><i class='icon-moon-stroke ft-sz-16 p-rgt-15'></i>Dark Mode</span>
	</div>
</template>

<script>
export default {
	name: 'banner',
	components: {
	},
	props: {},
	data() {
		return {
		}
	},
	methods: {
	},
	watch: {}
};
</script>
<style lang='scss' type="text/scss">
@import '~_scss_/_mixins';
#banner {
	@include box-shadow((color: rgba(0,0,0,0.05))...);
	display: flex;
	span {
		display: inline-block;
		line-height: 20px;
	}
}
</style>


